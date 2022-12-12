package org.kpcc.clipper.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Favorite {
    private String clipId;
    @JsonProperty // is* field
    private boolean isFavorite;
}
