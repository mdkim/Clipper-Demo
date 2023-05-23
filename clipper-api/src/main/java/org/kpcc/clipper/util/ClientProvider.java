package org.kpcc.clipper.util;

import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import org.kpcc.clipper.controller.NotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import javax.annotation.PostConstruct; // for Java >9, use `jakarta.annotation.PostConstruct`
import reactor.core.publisher.Mono;

@Component
@PropertySource("classpath:api.properties")
public class ClientProvider {

    @Value("${org.id}")
    private String org_id;
    @Value("${omny.api.url}")
    private String omny_api_url;

    private WebClient client;

    public WebClient getClient() {
        return client;
    }

    public void setOrgId(String org_id) {
        this.org_id = org_id;
        this.initClient();
    }

    @PostConstruct
    private void postConstruct() {
        this.initClient();
    }

    private void initClient() {
        String omny_api_url = this.omny_api_url + "orgs/" + this.org_id;
        this.client = WebClient.builder().baseUrl(omny_api_url)
            .defaultHeader(CONTENT_TYPE, APPLICATION_JSON_VALUE)
            // for "DataBufferLimitException: Exceeded limit on max bytes to buffer"
            .exchangeStrategies(ExchangeStrategies
                .builder()
                .codecs(configurer -> configurer
                    .defaultCodecs()
                    .maxInMemorySize(4 * 1024 * 1024)
                )
                .build()
            )
            .filter(catch4xxClientResponse())
            .build();
    }

    /**
     * @return
     */
    private ExchangeFilterFunction catch4xxClientResponse() {
        return ExchangeFilterFunction.ofResponseProcessor(res -> {
            if (res.statusCode().is4xxClientError()) {
                return Mono.error(new NotFoundException());
            }
            return Mono.just(res);
        });
    }
}
