package org.kpcc.clipper.controllers;

import org.kpcc.clipper.model.Program;
import org.kpcc.clipper.model.ProgramsResponse;
import org.kpcc.clipper.util.ClientProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class ProgramController {

    @Autowired
    ClientProvider clientProvider;

    @GetMapping("/programs")
    public ProgramsResponse getPrograms() {
        Mono<ProgramsResponse> mono = clientProvider.getClient().get()
            .uri("/programs").retrieve()
            .bodyToMono(ProgramsResponse.class);
        return mono.block();
    }

    @GetMapping("/programs/{programId}")
    public Program getProgram(@PathVariable String programId) {
        Mono<Program> mono = clientProvider.getClient().get()
            .uri("/programs/" + programId).retrieve()
            .bodyToMono(Program.class);
        return mono.block();
    }
}