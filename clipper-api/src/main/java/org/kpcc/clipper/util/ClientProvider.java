package org.kpcc.clipper.util;

import jakarta.annotation.PostConstruct;
import org.kpcc.clipper.controllers.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
@PropertySource("classpath:api.properties")
public class ClientProvider {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Value("${org.id}")
    private String org_id;
    @Value("${omny.api.url}")
    private String omny_api_url;

    private WebClient client;

    public WebClient getClient() {
        return client;
    }

    @PostConstruct
    private void postConstruct() {
        this.omny_api_url += "orgs/" + this.org_id;

        this.client = WebClient.builder().baseUrl(this.omny_api_url)
            .defaultHeader(CONTENT_TYPE, APPLICATION_JSON_VALUE)
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
