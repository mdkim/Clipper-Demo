package org.kpcc.clipper.controllers;

import org.kpcc.clipper.model.Clip;
import org.kpcc.clipper.model.ClipsResponse;
import org.kpcc.clipper.util.ClientProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class ClipController {

    @Autowired
    ClientProvider clientProvider;

    @GetMapping("/programs/{programId}/clips")
    public ClipsResponse getPrograms(@PathVariable String programId) {
        Mono<ClipsResponse> mono = clientProvider.getClient().get()
            .uri("/programs/" + programId + "/clips").retrieve()
            .bodyToMono(ClipsResponse.class);
        return mono.block();
    }

    @GetMapping("/clips/{clipId}")
    public Clip getProgram(@PathVariable String clipId) {
        Mono<Clip> mono = clientProvider.getClient().get()
            .uri("/clips/" + clipId).retrieve()
            .bodyToMono(Clip.class);
        return mono.block();
    }
}
