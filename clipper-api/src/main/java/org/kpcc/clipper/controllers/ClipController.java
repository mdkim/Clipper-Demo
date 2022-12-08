package org.kpcc.clipper.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClipController {
    
    @GetMapping("/clips/{programId}")
	public String getClips(@PathVariable Integer programId) {
		return null;
	}

    @GetMapping("/clip/{clipId}")
	public String getClip(@PathVariable Integer clipId) {
		return null;
	}
}
