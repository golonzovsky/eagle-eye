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
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

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

    @Autowired
    TargetTomcatProperties configProps;

    @Autowired
    AppsListingService appsListingService;

    @DeleteMapping("undeploy")
    UndeployResult undeploy(@RequestParam("path") String path, @RequestParam(value = "dryRun", defaultValue = "false") Boolean dryRun) {
        return appsListingService.undeploy(path, dryRun);
    }

    @GetMapping("config")
    TargetTomcatProperties config() {
        return configProps;
    }

    @GetMapping("apps")
    List<Application> apps() {
        return appsListingService.apps();
    }

    @RequestMapping("/sse-stream")
    public SseEmitter subscribeMetrics() {
        return appsListingService.getEmitter();
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
