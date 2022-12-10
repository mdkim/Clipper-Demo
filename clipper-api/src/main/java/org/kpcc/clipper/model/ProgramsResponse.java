package org.kpcc.clipper.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class ProgramsResponse {

    @JsonProperty("Programs")
    private List<Program> programs;
}
