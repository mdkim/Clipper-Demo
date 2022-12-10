package org.kpcc.clipper.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Program {
    @JsonProperty("Id")
    private String id;
    @JsonProperty("Name")
    private String name;
    @JsonProperty("Slug")
    private String slug;
    @JsonProperty("Description")
    private String description;
    @JsonProperty("DescriptionHtml")
    private String descriptionHtml;
    @JsonProperty("Author")
    private String author;
    @JsonProperty("ArtworkUrl")
    private String artworkUrl;
}