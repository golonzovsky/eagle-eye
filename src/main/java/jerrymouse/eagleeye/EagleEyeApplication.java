package jerrymouse.eagleeye;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.http.client.support.BasicAuthorizationInterceptor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static java.util.stream.Collectors.toList;

@SpringBootApplication
@EnableConfigurationProperties(TargetTomcatProperties.class)
public class EagleEyeApplication {

    public static void main(String[] args) {
        SpringApplication.run(EagleEyeApplication.class, args);
    }

    @Bean
    RestOperations restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getInterceptors().add(new BasicAuthorizationInterceptor("us", "su"));
        return restTemplate;
    }

}

@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RestController
class AppsController {

    public static final String UNDEPLOY_OK_PREFIX = "OK - Undeployed application at context path";
    public static final String APP_LIST_OK_PREFIX = "OK - Listed applications for virtual host";

    @Autowired
    RestOperations restTemplate;

    @Autowired
    TargetTomcatProperties configProps;

    @DeleteMapping("undeploy")
    UndeployResult undeploy(@RequestParam("path") String path) {
        //todo filter path
        String resp = restTemplate.getForObject(configProps.getManagerAddress() + "undeploy?path=" + path, String.class);
        return new UndeployResult(resp.startsWith(UNDEPLOY_OK_PREFIX));
    }

    @GetMapping("config")
    TargetTomcatProperties config() {
        return configProps;
    }

    @GetMapping("apps")
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
                //.peek(propArr -> System.out.println("\n\narray:   " + Arrays.asList(propArr) + "\n\n"))
                .map(props -> new Application(props[0], props[3], "running".equals(props[1]), Long.parseLong(props[2]), "manager".equals(props[0])))
                .collect(toList());
    }
}

@Data
@AllArgsConstructor
class UndeployResult {
    private boolean success;
}

@Data
@AllArgsConstructor
class Application {
    private String contextPath;
    private String docBase;
    private boolean running;
    private long sessions;
    private boolean readonly;
}
