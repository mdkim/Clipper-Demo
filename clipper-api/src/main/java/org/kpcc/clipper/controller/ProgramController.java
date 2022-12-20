package org.kpcc.clipper.controller;

import org.kpcc.clipper.model.Favorite;
import org.kpcc.clipper.model.Org;
import org.kpcc.clipper.model.Program;
import org.kpcc.clipper.model.ProgramsResponse;
import org.kpcc.clipper.util.ClientProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@CrossOrigin
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

    @PutMapping("/org")
    public void setClientOrgId(@RequestBody Org org) {
        clientProvider.setOrgId(org.getOrgId());
    }
}