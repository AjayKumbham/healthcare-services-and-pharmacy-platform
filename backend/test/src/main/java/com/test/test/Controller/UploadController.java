package com.test.test.Controller;

import java.io.IOException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth")
public class UploadController {

    @PostMapping("/upload")
    public Map<String, Object> uploadPrescription(@RequestParam("file") MultipartFile file) throws IOException {
        Map<String, Object> response = new HashMap<>();
        String content = new String(file.getBytes());

        // Extract patient name
        String patientName = extractPatientName(content);
        if (patientName != null) response.put("patientName", patientName);

        // Extract date
        String date = extractDate(content);
        if (date != null) response.put("date", date);

        // Extract condition
        String condition = extractCondition(content);
        if (condition != null) response.put("condition", condition);

        // Extract doctor name
        String doctorName = extractDoctorName(content);
        if (doctorName != null) response.put("doctorName", doctorName);

        // Extract hospital name
        String hospitalName = extractHospitalName(content);
        if (hospitalName != null) response.put("hospitalName", hospitalName);

        // Extract hospital address
        String hospitalAddress = extractHospitalAddress(content);
        if (hospitalAddress != null) response.put("hospitalAddress", hospitalAddress);

        // Extract age
        String age = extractAge(content);
        if (age != null) response.put("age", age);

        // Extract medications and days
        List<Map<String, String>> medications = extractMedications(content);
        if (!medications.isEmpty()) response.put("medications", medications);

        return response;
    }

    private String extractPatientName(String content) {
        Pattern pattern = Pattern.compile("\\bPatient:\\s*([A-Za-z]+\\s+[A-Za-z]+)\\b");
        Matcher matcher = pattern.matcher(content);
        return matcher.find() ? matcher.group(1).trim() : null;
    }

    private String extractDate(String content) {
        Pattern pattern = Pattern.compile("\\bDate:\\s*(\\d{4}-\\d{2}-\\d{2}|\\d{2}/\\d{2}/\\d{4})\\b");
        Matcher matcher = pattern.matcher(content);
        return matcher.find() ? matcher.group(1) : null;
    }

    private String extractCondition(String content) {
        Pattern pattern = Pattern.compile("Condition:\\s*([A-Za-z0-9 ]+)");
        Matcher matcher = pattern.matcher(content);
        return matcher.find() ? matcher.group(1).trim() : null;
    }

    private String extractDoctorName(String content) {
        Pattern pattern = Pattern.compile("Dr\\.\\s+[A-Za-z]+\\s+[A-Za-z]+");
        Matcher matcher = pattern.matcher(content);
        return matcher.find() ? matcher.group() : null;
    }

    private String extractHospitalName(String content) {
        Pattern pattern = Pattern.compile("([A-Za-z ]+(Clinic|Hospital|Care|Center))");
        Matcher matcher = pattern.matcher(content);
        return matcher.find() ? matcher.group(1).trim() : null;
    }

    private String extractHospitalAddress(String content) {
        Pattern pattern = Pattern.compile("(\\d+\\s+[A-Za-z0-9 ]+,\\s+[A-Za-z]+,\\s+[A-Za-z]{2}\\s+\\d{5})");
        Matcher matcher = pattern.matcher(content);
        return matcher.find() ? matcher.group(1) : null;
    }

    private String extractAge(String content) {
        Pattern pattern = Pattern.compile("\\bAge:\\s*(\\d{1,3})\\b");
        Matcher matcher = pattern.matcher(content);
        return matcher.find() ? matcher.group(1) : null;
    }

    private List<Map<String, String>> extractMedications(String content) {
        List<Map<String, String>> medicationsList = new ArrayList<>();
        Pattern pattern = Pattern.compile("([A-Za-z]+\\s*\\d+mg)\\s*–\\s*.*?for\\s*(\\d+)\\s*days");
        Matcher matcher = pattern.matcher(content);

        while (matcher.find()) {
            Map<String, String> medication = new HashMap<>();
            medication.put("name", matcher.group(1).trim()); // Medication name
            medication.put("days", matcher.group(2).trim()); // Number of days
            medicationsList.add(medication);
        }
        return medicationsList;
    }
}
