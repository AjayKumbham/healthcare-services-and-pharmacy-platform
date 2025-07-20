package com.test.test.Controller;

import com.test.test.DTO.CustomerDetailsResponse;
import com.test.test.Entity.*;
import com.test.test.Repository.*;
import com.test.test.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class PrimaryUserController {

    @Autowired
    private PrimaryUserService primaryUserService;

    @Autowired
    private PrimaryUserRepository primaryUserRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ContactInformationService contactInformationService;

    @Autowired
    private ContactInformationRepository contactInformationRepository;

    @Autowired
    private DeliveryAddressService deliveryAddressService;

    @Autowired
    private DeliveryAddressRepository deliveryAddressRepository;

    @Autowired
    private HealthInformationService healthInformationService;

    @Autowired
    private HealthInformationRepository healthInformationRepository;

    @Autowired
    private PaymentInformationService paymentInformationService;

    @Autowired
    private PaymentInformationRepository paymentInformationRepository;

    @Autowired
    private SecurityInformationService securityInformationService;

    @Autowired
    private SecurityInformationRepository securityInformationRepository;

    @Autowired
    private DependentInformationService dependentInformationService;

    @Autowired
    private DependentInformationRepository dependentInformationRepository;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/getCoveragePlan")
    public Long getCoveragePlan(@RequestParam String membershipId) {
        Optional<PrimaryUser> user = primaryUserRepository.findByMembershipId(membershipId);
        return user.map(PrimaryUser::getCoveragePlan).orElse(1L);  // Default to 1 if user not found
    }

    @GetMapping("/validateMembershipId/{membershipId}")
    public ResponseEntity<?> validateMembershipId(@PathVariable String membershipId) {
        boolean exists = primaryUserService.isMembershipIdExists(membershipId);
        if (exists) {
            return ResponseEntity.ok("Membership ID is valid");
        } else {
            return ResponseEntity.status(404).body("Membership ID not found");
        }
    }

    @PostMapping("/dependent-information")
    public ResponseEntity<String> saveDependentInformation(@RequestBody DependentInformation dependentInformation) {
        try {
            // Save the dependent information to the database
            dependentInformationService.saveDependentInformation(dependentInformation);
            return ResponseEntity.ok("Dependent Information saved successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to save dependent information.");
        }
    }

    @GetMapping("/dependent/{membershipId}")
    public ResponseEntity<List<DependentInformation>> getDependentInformation(@PathVariable String membershipId) {
        try {
            List<DependentInformation> dependentInfoList = dependentInformationService.getDependentInfo(membershipId);
            return new ResponseEntity<>(dependentInfoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/dependent-information/{id}")
    public ResponseEntity<DependentInformation> updateDependentInformation(
            @PathVariable Long id,
            @RequestBody DependentInformation dependentInformation) {

        DependentInformation updatedDependent = dependentInformationService.updateDependentInformation(id, dependentInformation);

        if (updatedDependent != null) {
            return ResponseEntity.ok(updatedDependent);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/dependent-information/{id}")
    public ResponseEntity<Void> deleteDependentInformation(@PathVariable Long id) {
        DependentInformation existingDependent = dependentInformationService.getDependentInformationById(id);

        if (existingDependent != null) {
            dependentInformationService.deleteDependentInformation(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/get/patient/data")
    public ResponseEntity<?> findHealthInformationByName(@RequestParam String name) {
        // Search in HealthInformation table
        HealthInformation healthInfo = healthInformationRepository.findByName(name);
        if (healthInfo != null) {
            return ResponseEntity.ok(healthInfo);
        }

        // Search in DependentInformation table if not found in HealthInformation
        DependentInformation dependentInfo = dependentInformationRepository.findByName(name);
        if (dependentInfo != null) {
            return ResponseEntity.ok(dependentInfo);
        }

        // If name is not found in either table
        return ResponseEntity.status(404).body("No records found for name: " + name);
    }

    // Endpoint to save security information
    @PostMapping("/security-information")
    public String saveSecurityInformation(@RequestBody SecurityInformation securityInformation) {
        // Save the security information and hash the password
        SecurityInformation savedInfo = securityInformationService.saveSecurityInformation(securityInformation);

        // Return a success message
        return "Security information saved successfully!";
    }

    @GetMapping("/security/{membershipId}")
    public SecurityInformation getSecurityInfo(@PathVariable String membershipId) {
        return securityInformationService.getSecurityInfo(membershipId);
    }

    @PutMapping("/security/{membershipId}")
    public ResponseEntity<SecurityInformation> updateSecurityInformation(
            @PathVariable String membershipId,
            @RequestBody SecurityInformation securityInformation) {

        Optional<SecurityInformation> existingSecurity = Optional.ofNullable(securityInformationRepository.findByMembershipId(membershipId));

        if (existingSecurity.isPresent()) {
            SecurityInformation updatedSecurity = existingSecurity.get();

            // Update the fields (assuming fields in your form match the entity)
            updatedSecurity.setPassword(securityInformation.getPassword());
            updatedSecurity.setSecurityAnswer(securityInformation.getSecurityAnswer());
            updatedSecurity.setSecurityQuestion(securityInformation.getSecurityQuestion());

            // Save the updated contact information
            SecurityInformation savedSecurity = securityInformationRepository.save(updatedSecurity);

            return ResponseEntity.ok(savedSecurity);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/payment-information")
    public ResponseEntity<String> submitPaymentInformation(@RequestBody PaymentInformation paymentInformation) {
        try {
            // Save the payment information in the database
            paymentInformationService.savePaymentInformation(paymentInformation);
            return new ResponseEntity<>("Payment information submitted successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error submitting payment information.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/payment-information/{membershipId}")
    public ResponseEntity<List<PaymentInformation>> getPaymentInformation(@PathVariable String membershipId) {
        try {
            List<PaymentInformation> paymentInfoList = paymentInformationService.getPaymentInfo(membershipId);
            return new ResponseEntity<>(paymentInfoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/payment-information/{id}")
    public ResponseEntity<PaymentInformation> updatePaymentInformation(
            @PathVariable Long id,
            @RequestBody PaymentInformation paymentInformation) {

        PaymentInformation updatedPayment = paymentInformationService.updatePaymentInformation(id, paymentInformation);

        if (updatedPayment != null) {
            return ResponseEntity.ok(updatedPayment);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/payment-information/{id}")
    public ResponseEntity<Void> deletePaymentInformation(@PathVariable Long id) {
        PaymentInformation existingPayment = paymentInformationService.getPaymentInformationById(id);

        if (existingPayment != null) {
            paymentInformationService.deletePaymentInformation(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/health-information")
    public String submitHealthInformation(@RequestBody HealthInformation healthInformation) {
        Optional<Customer> customerOpt = customerRepository.findByMembershipId(healthInformation.getMembershipId());

        if (customerOpt.isPresent()) {
            String username = customerOpt.get().getName();
            healthInformation.setName(username);
        } else {
            System.out.println("Customer not found for Membership ID: " + healthInformation.getMembershipId());
            return "Customer not found!";
        }
        if (healthInformationService.saveHealthInformation(healthInformation)) {
            return "Health information submitted successfully!";
        } else {
            return "Failed to submit health information.";
        }
    }

    @GetMapping("/healthConditions/{membershipId}")
    public HealthInformation getHealthInfo(@PathVariable String membershipId) {
        return healthInformationService.getHealthInfo(membershipId);
    }

    @PutMapping("/health-information/{membershipId}")
    public ResponseEntity<HealthInformation> updateHealthInformation(
            @PathVariable String membershipId,
            @RequestBody HealthInformation healthInformation) {

        Optional<HealthInformation> existingHealth = Optional.ofNullable(healthInformationRepository.findByMembershipId(membershipId));
        Optional<Customer> customerOpt = customerRepository.findByMembershipId(membershipId);

        if (existingHealth.isPresent()) {
            HealthInformation updatedHealth = existingHealth.get();

            // Update the fields (assuming fields in your form match the entity)
            updatedHealth.setAllergies(healthInformation.getAllergies());
            updatedHealth.setCurrentMedications(healthInformation.getCurrentMedications());
            updatedHealth.setHealthConditions(healthInformation.getHealthConditions());

            customerOpt.ifPresent(customer -> updatedHealth.setName(customer.getName()));

            // Save the updated contact information
            HealthInformation savedHealth = healthInformationRepository.save(updatedHealth);

            return ResponseEntity.ok(savedHealth);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/delivery-submit")
    public ResponseEntity<String> submitAddress(@RequestBody DeliveryAddressInformation deliveryAddress) {
        boolean isSaved = deliveryAddressService.saveDeliveryAddress(deliveryAddress);

        if (isSaved) {
            return ResponseEntity.ok("Address submitted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to submit address.");
        }
    }

    @GetMapping("/delivery/{membershipId}")
    public ResponseEntity<List<DeliveryAddressInformation>> getDeliveryInfo(@PathVariable String membershipId) {
        try {
            List<DeliveryAddressInformation> deliveryInfoList = deliveryAddressService.getAddressInfo(membershipId);
            return new ResponseEntity<>(deliveryInfoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/delivery-submit/{id}")
    public ResponseEntity<DeliveryAddressInformation> updateAddressInformation(
            @PathVariable Long id,
            @RequestBody DeliveryAddressInformation deliveryAddressInformation) {

        DeliveryAddressInformation updatedAddress = deliveryAddressService.updateAddressInformation(id, deliveryAddressInformation);

        if (updatedAddress != null) {
            return ResponseEntity.ok(updatedAddress);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/delivery-submit/{id}")
    public ResponseEntity<Void> deleteAddressInformation(@PathVariable Long id) {
        DeliveryAddressInformation existingAddress = deliveryAddressService.getAddressInformationById(id);

        if (existingAddress != null) {
            deliveryAddressService.deleteAddressInformation(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/contact")
    public String submitContactForm(@RequestBody ContactInformation contactInformation) {
        contactInformationService.saveContactInfo(contactInformation);
        return "Contact information saved successfully!";
    }

    @GetMapping("/contact/{membershipId}")
    public ContactInformation getContactInfo(@PathVariable String membershipId) {
        return contactInformationService.getContactInfo(membershipId);
    }

    @PutMapping("/contact/{membershipId}")
    public ResponseEntity<ContactInformation> updateContactInformation(
            @PathVariable String membershipId,
            @RequestBody ContactInformation contactInformation) {

        // Find the contact information by membershipId
        Optional<ContactInformation> existingContact = Optional.ofNullable(contactInformationRepository.findByMembershipId(membershipId));

        if (existingContact.isPresent()) {
            ContactInformation updatedContact = existingContact.get();

            // Update the fields (assuming fields in your form match the entity)
            updatedContact.setEmailAddress(contactInformation.getEmailAddress());
            updatedContact.setMobileNumber(contactInformation.getMobileNumber());
            updatedContact.setPreferredContactMethod(contactInformation.getPreferredContactMethod());
            updatedContact.setMembershipId(contactInformation.getMembershipId());

            // Save the updated contact information
            ContactInformation savedContact = contactInformationRepository.save(updatedContact);

            return ResponseEntity.ok(savedContact);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    private final Map<String, String> otpStore = new HashMap<>();
    private static final Map<String, Long> otpExpiryStore = new HashMap<>();
    private static final long OTP_EXPIRY_TIME = TimeUnit.MINUTES.toMillis(5);

    @PostMapping("/users")
    public ResponseEntity<PrimaryUser> createUser(@RequestBody PrimaryUser primaryUser) {
        PrimaryUser savedUser = primaryUserService.saveUser(primaryUser);
        String membershipId = savedUser.getMembershipId();
        String profileSetupLink = "http://localhost:5173/signup";
        String emailSubject = "Signup to Evernorth Health Services";
        String emailBody = "Thank you for your interest in EverNorth Health Services \n Your account has been created with Membership Id : "+membershipId+ "\n"+"To initialize your profile setup, visit the following link:\n" + profileSetupLink;
        emailService.sendEmail(primaryUser.getEmail(), emailSubject, emailBody);
        emailService.sendSms(primaryUser.getPhone(), emailBody);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        try {
            // Generate OTP
            String otp = String.valueOf((int)(Math.random() * 9000) + 1000); // 4-digit OTP

            // Store OTP and expiry (5 minutes)
            otpStore.put(email, otp);
            otpExpiryStore.put(email, System.currentTimeMillis() + (5 * 60 * 1000));

            // Send OTP via email (use an email service here)
            emailService.sendEmail(email, "Your OTP Code", "Your OTP is: " + otp);

            return ResponseEntity.ok("OTP sent successfully to " + email);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error sending OTP: " + e.getMessage());
        }
    }


    @GetMapping("/account-creation")
    public ResponseEntity<String> requestOtp(@RequestParam String membershipid) {
        if (otpStore.containsKey(membershipid)) {
            return ResponseEntity.ok("OTP has been sent to your registered email.");
        }
        return ResponseEntity.badRequest().body("Invalid membership ID.");
    }

    @GetMapping("/customer-details")
    public ResponseEntity<?> getCustomerDetails(@RequestParam("membershipId") String membershipId) {
        try {
            Optional<Customer> customerOpt = customerRepository.findByMembershipId(membershipId);

            if (customerOpt.isPresent()) {
                Customer customer = customerOpt.get();
                // Return DTO with email and phone
                CustomerDetailsResponse response = new CustomerDetailsResponse(customer.getName(),customer.getEmail(), customer.getPhone());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(404).body("Customer not found with Membership ID: " + membershipId);
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestParam("membershipId") String membershipId, @RequestParam("otp") String otp) {
        try {
            // Check if OTP exists and is within expiry time
            if (otpStore.containsKey(membershipId) && otpStore.get(membershipId).equals(otp)) {
                long expiryTime = otpExpiryStore.get(membershipId);
                if (System.currentTimeMillis() <= expiryTime) {
                    // OTP is valid, proceed to profile setup completion
                    otpStore.remove(membershipId);  // Remove OTP after successful verification
                    otpExpiryStore.remove(membershipId);
                    return ResponseEntity.ok("OTP verified successfully. Proceed to complete your profile.");
                } else {
                    return ResponseEntity.status(400).body("OTP has expired.");
                }
            } else {
                return ResponseEntity.status(400).body("Invalid OTP.");
            }
        } catch (Exception e) {
            // Error handling for verification
            return ResponseEntity.status(500).body("Error occurred during OTP verification: " + e.getMessage());
        }
    }

    @PostMapping("/validate-otp")
    public ResponseEntity<String> validateOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        try {
            if (otpStore.containsKey(email) && otpStore.get(email).equals(otp)) {
                long expiryTime = otpExpiryStore.get(email);
                if (System.currentTimeMillis() <= expiryTime) {
                    // OTP is valid
                    otpStore.remove(email); // Remove OTP after validation
                    otpExpiryStore.remove(email);
                    return ResponseEntity.ok("OTP validated successfully.");
                } else {
                    return ResponseEntity.status(400).body("OTP has expired.");
                }
            } else {
                return ResponseEntity.status(400).body("Invalid OTP.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error validating OTP: " + e.getMessage());
        }
    }


    private String generateOtp() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }

}

// Helper class for OTP verification request
class OtpRequest {
    private String membershipId;
    private String otp;

    // Getters and setters

    public String getMembershipId() {
        return membershipId;
    }

    public void setMembershipId(String membershipId) {
        this.membershipId = membershipId;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}
