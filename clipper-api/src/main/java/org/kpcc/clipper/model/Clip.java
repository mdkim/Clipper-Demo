package org.kpcc.clipper.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Clip {
    @JsonProperty("Id")
    private String id;
    @JsonProperty("Title")
    private String title;
    @JsonProperty("Slug")
    private String slug;
    @JsonProperty("Description")
    private String description;
    @JsonProperty("DescriptionHtml")
    private String descriptionHtml;
    @JsonProperty("ImageUrl")
    private String imageUrl;
    @JsonProperty("AudioUrl")
    private String audioUrl;
    @JsonProperty("EmbedUrl")
    private String embedUrl;
    @JsonProperty("DurationSeconds")
    private String durationSeconds;
    @JsonProperty("PublishedUtc")
    private String publishedUtc;
}