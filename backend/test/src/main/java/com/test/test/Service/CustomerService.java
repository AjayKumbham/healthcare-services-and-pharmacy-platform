package com.test.test.Service;

import com.test.test.Entity.ContactInformation;
import com.test.test.Entity.Customer;
import com.test.test.Repository.CustomerRepository;
import com.test.test.Repository.PrimaryUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PrimaryUserRepository primaryUserRepository;

//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;  // Add this for password hashing

    public Customer registerCustomer(Customer customer) throws Exception {
        // Generate membership ID dynamically
        boolean membershipExists = primaryUserRepository.existsByMembershipId(customer.getMembershipId());
        if (!membershipExists) {
            throw new Exception("Membership ID not found.");
        }

//        boolean membershipCustomers = customerRepository.existsByMembershipId(customer.getMembershipId());
//        if(!membershipCustomers){
//            throw new Exception("You have already registered.");
//        }

        // Hash the password before saving


        // Save the customer to the database
        return customerRepository.save(customer);
    }
}
