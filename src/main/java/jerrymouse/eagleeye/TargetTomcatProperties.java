package jerrymouse.eagleeye;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@ConfigurationProperties(prefix = "eagle-eye")
public class TargetTomcatProperties {
    private String tomcatHost = "http://localhost:8080";
    private String managerPrefix = "/manager/text/";

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
