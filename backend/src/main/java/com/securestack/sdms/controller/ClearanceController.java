package com.securestack.sdms.controller;

import com.securestack.sdms.dto.ApiResponse;
import com.securestack.sdms.entity.ReleaseRequest;
import com.securestack.sdms.service.ClearanceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/clearance")
@RequiredArgsConstructor
@Tag(name = "Clearance Hub", description = "Sequential 5-Gate Clearance and Release NOC management")
public class ClearanceController {

    private final ClearanceService clearanceService;

    @GetMapping("/requests")
    @Operation(summary = "List Release Requests")
    public ResponseEntity<ApiResponse<List<ReleaseRequest>>> listRequests() {
        return ResponseEntity.ok(ApiResponse.ok(clearanceService.getAllRequests()));
    }

    @GetMapping("/requests/{id}")
    @Operation(summary = "Get Release Request Details")
    public ResponseEntity<ApiResponse<ReleaseRequest>> getRequest(@PathVariable String id) {
        return clearanceService.getRequestById(id)
                .map(r -> ResponseEntity.ok(ApiResponse.ok(r)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/requests/{id}/gates/{gateNumber}/resolve")
    @Operation(summary = "Resolve Clearance Gate", description = "Resolves a specific gate (e.g. Gate 4 Finance Hold) and sequentially unblocks next gate")
    public ResponseEntity<ApiResponse<ReleaseRequest>> resolveGate(
            @PathVariable String id,
            @PathVariable int gateNumber,
            @RequestParam(defaultValue = "Meena Agarwal") String officerName) {
        ReleaseRequest updated = clearanceService.resolveGate(id, gateNumber, officerName);
        return ResponseEntity.ok(ApiResponse.ok(updated, "Gate " + gateNumber + " resolved successfully"));
    }
}
