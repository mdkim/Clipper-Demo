package org.kpcc.clipper.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProgramController {

	@GetMapping("/programs")
	public String getPrograms() {
		return null;
	}

	@GetMapping("/programs/{programId}")
	public String getProgram(@PathVariable Integer programId) {
		return null;
	}

}
