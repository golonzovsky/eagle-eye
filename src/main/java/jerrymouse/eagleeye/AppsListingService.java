package jerrymouse.eagleeye;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestOperations;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import static java.util.stream.Collectors.toList;

@Slf4j
@Service
@RequiredArgsConstructor
public class AppsListingService {

    private static final String UNDEPLOY_OK_PREFIX = "OK - Undeployed application at context path";
    private static final String APP_LIST_OK_PREFIX = "OK - Listed applications for virtual host";

    private final RestOperations restTemplate;
    private final TargetTomcatProperties configProps;

    private List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    @PostConstruct
    void init() {
        log.info("using config props: {}", configProps);
    }

    SseEmitter getEmitter() {
        SseEmitter emitter = new SseEmitter();
        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitters.add(emitter);
        return emitter;
    }

    UndeployResult undeploy(String path, Boolean dryRun) {
        if (configProps.getBlockContexts().contains(path)) return new UndeployResult(false);
        //todo filter path
        String resp = dryRun ? UNDEPLOY_OK_PREFIX : restTemplate.getForObject(configProps.getManagerAddress() + "undeploy?path=" + path, String.class);
        notifyListenersOnUndeploy(path);
        return new UndeployResult(resp.startsWith(UNDEPLOY_OK_PREFIX));
    }

    //todo consider moving subscription logic to separate service with ApplicationEvent messaging to avoid blocking main logic on notifications
    List<Application> apps() {
        String appsText = restTemplate.getForObject(configProps.getManagerAddress() + "list", String.class);
        if (!appsText.startsWith(APP_LIST_OK_PREFIX)) {
            log.warn("invalid response from tomcat manager: ", appsText);
            return Collections.emptyList();
        }
        String[] appLines = appsText.split("\n");
        return Arrays.stream(appLines)
                .skip(1)
                .map(s -> s.split(":"))
                .map(this::buildApp)
                .collect(toList());
    }

    private void notifyListenersOnUndeploy(String path) {
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event().name("undeploy").data(path));
            } catch (IOException e) {
                log.debug("subscriber notification failure", e);
            }
        }
    }

    private Application buildApp(String[] props) {
        boolean isReadOnly = configProps.getBlockContexts().contains(props[0]);
        return new Application(props[0], props[3], "running".equals(props[1]), Long.parseLong(props[2]), isReadOnly);
    }
}
