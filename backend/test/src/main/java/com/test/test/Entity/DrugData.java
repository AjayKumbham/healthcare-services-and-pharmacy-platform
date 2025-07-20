package com.test.test.Entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "drug_data")
public class DrugData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer mId;

    @Column(nullable = false, length = 100)
    private String medName;

    @Column(nullable = true, length = 500)
    private String description;

    @Column(nullable = true)
    private String imageUrl;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DrugType drugType;

    @Column(nullable = true)
    private String brandName;

    @Column(nullable = false)
    private String strength;

    @Column(nullable = false)
    private String frequency;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AgeRange ageRange;

    @Column(nullable = false)
    private String quantityPerSheetOrBox;

    @Column(nullable = false)
    private Integer quantity;


    @ElementCollection
    @CollectionTable(name = "alternative_med_ids", joinColumns = @JoinColumn(name = "mId"))
    @Column(name = "alternative_med_id")
    private List<Integer> alternativeMedIds;

    public DrugData() {
        // Default constructor
    }

    public DrugData(String medName, String description, String imageUrl, DrugType drugType,
                    String brandName, String strength, String frequency, AgeRange ageRange,Integer quantity,
                    String quantityPerSheetOrBox, List<Integer> alternativeMedIds) {
        this.medName = medName;
        this.description = description;
        this.imageUrl = imageUrl;
        this.drugType = drugType;
        this.brandName = brandName;
        this.strength = strength;
        this.frequency = frequency;
        this.ageRange = ageRange;
        this.quantityPerSheetOrBox = quantityPerSheetOrBox;
        this.quantity = quantity;
        this.alternativeMedIds = alternativeMedIds;
    }

    public Integer getmId() {
        return mId;
    }

    public void setmId(Integer mId) {
        this.mId = mId;
    }

    public String getMedName() {
        return medName;
    }

    public void setMedName(String medName) {
        this.medName = medName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public DrugType getDrugType() {
        return drugType;
    }

    public void setDrugType(DrugType drugType) {
        this.drugType = drugType;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getStrength() {
        return strength;
    }

    public void setStrength(String strength) {
        this.strength = strength;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public AgeRange getAgeRange() {
        return ageRange;
    }

    public void setAgeRange(AgeRange ageRange) {
        this.ageRange = ageRange;
    }

    public String getQuantityPerSheetOrBox() {
        return quantityPerSheetOrBox;
    }

    public void setQuantityPerSheetOrBox(String quantityPerSheetOrBox) {
        this.quantityPerSheetOrBox = quantityPerSheetOrBox;
    }

    public Integer getQuantity() {return quantity;}

    public void setQuantity(Integer quantity) {this.quantity = quantity;}

    public List<Integer> getAlternativeMedIds() {
        return alternativeMedIds;
    }

    public void setAlternativeMedIds(List<Integer> alternativeMedIds) {
        this.alternativeMedIds = alternativeMedIds;
    }

    // Enum for DrugType (Generic or Branded)
    public enum DrugType {
        GENERIC, BRANDED
    }

    // Enum for AgeRange (Child, Adult, Elder)
    public enum AgeRange {
        CHILD, ADULT, ELDER
    }
}
