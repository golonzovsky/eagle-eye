package jerrymouse.eagleeye;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Data
@Validated
@NoArgsConstructor
@ConfigurationProperties(prefix = "eagle-eye")
public class TargetTomcatProperties {
    private String tomcatHost = "http://localhost:8080";
    private String managerPrefix = "/manager/text/";
    private Set<String> blockContexts = new HashSet<>(Arrays.asList("/", "/manager"));

    @NotNull
    @JsonIgnore
    private String username;

    @NotNull
    @JsonIgnore
    private String password;

    public String getManagerAddress() {
        return tomcatHost + managerPrefix;
    }
}
