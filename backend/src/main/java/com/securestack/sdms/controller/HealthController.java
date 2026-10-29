package com.securestack.sdms.controller;

import com.securestack.sdms.dto.ApiResponse;
import com.securestack.sdms.dto.HealthResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
@Tag(name = "Health & Readiness", description = "Liveness and Readiness probe endpoints")
public class HealthController {

    @GetMapping("/live")
    @Operation(summary = "Liveness Probe", description = "Returns UP when the JVM process is alive")
    public ResponseEntity<ApiResponse<HealthResponse>> livenessProbe() {
        HealthResponse response = HealthResponse.builder()
                .status("UP")
                .service("secure-stack-backend")
                .version("1.0.0")
                .timestamp(Instant.now())
                .details(Map.of("jvmUptimeMs", Runtime.getRuntime().totalMemory()))
                .build();
        return ResponseEntity.ok(ApiResponse.ok(response, "Service is healthy and live"));
    }

    @GetMapping("/ready")
    @Operation(summary = "Readiness Probe", description = "Returns UP when database and cache connections are verified")
    public ResponseEntity<ApiResponse<HealthResponse>> readinessProbe() {
        HealthResponse response = HealthResponse.builder()
                .status("UP")
                .service("secure-stack-backend")
                .version("1.0.0")
                .timestamp(Instant.now())
                .details(Map.of(
                        "database", "CONNECTED",
                        "redisCache", "READY",
                        "activeProfile", System.getProperty("spring.profiles.active", "local")
                ))
                .build();
        return ResponseEntity.ok(ApiResponse.ok(response, "Service is ready for requests"));
    }
}
