package com.test.test.Controller;

import com.test.test.DTO.CartItemRequest;
import com.test.test.Entity.DrugData;
import com.test.test.Entity.PharmaStores;
import com.test.test.Repository.CartItemRepository;
import com.test.test.Entity.CartItem;
import com.test.test.Entity.PrimaryUser;
import com.test.test.Repository.DrugDataRepository;
import com.test.test.Repository.PharmaStoresRepository;
import com.test.test.Repository.PrimaryUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class CartItemController {
    
    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    private PrimaryUserRepository primaryUserRepository;

    @Autowired
    private PharmaStoresRepository pharmaStoresRepository;

    @Autowired
    private DrugDataRepository drugDataRepository;


    @PostMapping("/addCart")
    public ResponseEntity<?> addToCart(@RequestBody CartItemRequest cartItemRequest) {
        try {
            // Fetch user
            String membershipId = primaryUserRepository.findByMembershipId(cartItemRequest.getMembershipId())
                    .map(PrimaryUser::getMembershipId) // Extract membershipId from PrimaryUser
                    .orElseThrow(() -> new RuntimeException("User not found"));


            // Fetch pharmacy
            PharmaStores pharmacy = pharmaStoresRepository.findByPhId(cartItemRequest.getPharmacyId())
                    .orElseThrow(() -> new RuntimeException("Pharmacy not found"));


            // Fetch medication
            DrugData medication = drugDataRepository.findByMId(cartItemRequest.getMedicationId())
                    .orElseThrow(() -> new RuntimeException("Medication not found"));

            // Create a new CartItem object
            CartItem cartItem = new CartItem();
            cartItem.setMembershipId(membershipId);
            cartItem.setPharmacy(pharmacy);
            cartItem.setMedication(medication);
            cartItem.setQuantity(cartItemRequest.getQuantity());
            cartItem.setUnitPrice(cartItemRequest.getUnitPrice());

            // Save to database
            CartItem savedCartItem = cartItemRepository.save(cartItem);

            return new ResponseEntity<>(savedCartItem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/getUserCart")
    public ResponseEntity<List<CartItem>> getMethodCart(@RequestParam String membershipId) {
        List<CartItem> cartItems = cartItemRepository.findUserCart(membershipId);

        return new ResponseEntity<>(cartItems, HttpStatus.OK);

    }

    @PostMapping("/updateCart")
    public ResponseEntity<CartItem> updateCart(@RequestParam Integer mId, @RequestParam Integer pId, @RequestParam int quantity) {
        CartItem cartItem = cartItemRepository.findCartItemByMedicationAndPharmacy(pId, mId);

        cartItem.setQuantity(quantity);

        CartItem savedCartItem = cartItemRepository.save(cartItem);

        return new ResponseEntity<>(savedCartItem , HttpStatus.OK);
    }


    @PostMapping("/delCart")
    public String postMethodName(@RequestParam String membershipId,
                                @RequestParam Integer medId,
                                @RequestParam Integer pharmId) {
        cartItemRepository.deleteByUserIdAndMedicationIdAndPharmacyId(membershipId, medId, pharmId);

        return "OK";
        
    }

}
