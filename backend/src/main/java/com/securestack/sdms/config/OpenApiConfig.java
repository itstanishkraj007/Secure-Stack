package com.securestack.sdms.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI secureStackOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("AICTE SDMS — SecureStack Core API")
                        .description("Security Deposit & FDR Management System for AICTE (Smart India Hackathon 2026 Problem 26265)")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Secure Stack Engineering Team")
                                .email("contact@securestack.aicte.gov.in"))
                        .license(new License()
                                .name("Government of India Open Data")
                                .url("https://data.gov.in")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local Dev Server"),
                        new Server().url("https://api.securestack.aicte.gov.in").description("Production Gateway")
                ));
    }
}
