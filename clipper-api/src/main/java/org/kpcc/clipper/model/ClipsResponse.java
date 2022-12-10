package org.kpcc.clipper.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class ClipsResponse {

    @JsonProperty("Clips")
    private List<Clip> clips;
}
