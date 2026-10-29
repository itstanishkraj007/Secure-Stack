package com.securestack.sdms.dto;

import lombok.Builder;
import lombok.Data;
import java.time.Instant;
import java.util.Map;

@Data
@Builder
public class HealthResponse {
    private String status;
    private String service;
    private String version;
    private Instant timestamp;
    private Map<String, Object> details;
}
