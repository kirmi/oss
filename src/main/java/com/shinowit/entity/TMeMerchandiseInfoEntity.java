package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Collection;

@Entity
@Table(name = "TMe_MerchandiseInfo")
public class TMeMerchandiseInfoEntity {
    private String merchandiseId;
    private Integer clickCount;
    private String describe;
    private Integer id;
    private String merchandiseAb;
    private String merchandiseName;
    private String picPath;
    private BigDecimal price;
    private String remark;
    private Boolean saleStatus;
    private String spec;
    private Collection<TMeInStockDetailsInfoEntity> tMeInStockDetailsInfosByMerchandiseId;
    private TMeMerchandiseCInfoEntity tMeMerchandiseCInfoByMerchandiseCid;
    private TMeProStatusInfoEntity tMeProStatusInfoByProStatusId;
    private TMeUnitInfoEntity tMeUnitInfoByUnitId;
    private Collection<TMeOrderDetailsInfoEntity> tMeOrderDetailsInfosByMerchandiseId;
    private Collection<TMeOutStockDetailsInfoEntity> tMeOutStockDetailsInfosByMerchandiseId;
    private Collection<TMeStockInfoEntity> tMeStockInfosByMerchandiseId;


    @Id
    @Column(name = "MerchandiseID")
    public String getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(String merchandiseId) {
        this.merchandiseId = merchandiseId;
    }

    @Basic
    @Column(name = "ClickCount")
    public Integer getClickCount() {
        return clickCount;
    }

    public void setClickCount(Integer clickCount) {
        this.clickCount = clickCount;
    }

    @Basic
    @Column(name = "Describe")
    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    @Basic
    @Column(name = "ID")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "MerchandiseAB")
    public String getMerchandiseAb() {
        return merchandiseAb;
    }

    public void setMerchandiseAb(String merchandiseAb) {
        this.merchandiseAb = merchandiseAb;
    }

    @Basic
    @Column(name = "MerchandiseName")
    public String getMerchandiseName() {
        return merchandiseName;
    }

    public void setMerchandiseName(String merchandiseName) {
        this.merchandiseName = merchandiseName;
    }

    @Basic
    @Column(name = "PicPath")
    public String getPicPath() {
        return picPath;
    }

    public void setPicPath(String picPath) {
        this.picPath = picPath;
    }

    @Basic
    @Column(name = "Price")
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Basic
    @Column(name = "SaleStatus")
    public Boolean getSaleStatus() {
        return saleStatus;
    }

    public void setSaleStatus(Boolean saleStatus) {
        this.saleStatus = saleStatus;
    }

    @Basic
    @Column(name = "Spec")
    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TMeMerchandiseInfoEntity that = (TMeMerchandiseInfoEntity) o;

        if (clickCount != null ? !clickCount.equals(that.clickCount) : that.clickCount != null) return false;
        if (describe != null ? !describe.equals(that.describe) : that.describe != null) return false;
        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (merchandiseAb != null ? !merchandiseAb.equals(that.merchandiseAb) : that.merchandiseAb != null)
            return false;
        if (merchandiseId != null ? !merchandiseId.equals(that.merchandiseId) : that.merchandiseId != null)
            return false;
        if (merchandiseName != null ? !merchandiseName.equals(that.merchandiseName) : that.merchandiseName != null)
            return false;
        if (picPath != null ? !picPath.equals(that.picPath) : that.picPath != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (saleStatus != null ? !saleStatus.equals(that.saleStatus) : that.saleStatus != null) return false;
        if (spec != null ? !spec.equals(that.spec) : that.spec != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = merchandiseId != null ? merchandiseId.hashCode() : 0;
        result = 31 * result + (clickCount != null ? clickCount.hashCode() : 0);
        result = 31 * result + (describe != null ? describe.hashCode() : 0);
        result = 31 * result + (id != null ? id.hashCode() : 0);
        result = 31 * result + (merchandiseAb != null ? merchandiseAb.hashCode() : 0);
        result = 31 * result + (merchandiseName != null ? merchandiseName.hashCode() : 0);
        result = 31 * result + (picPath != null ? picPath.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        result = 31 * result + (saleStatus != null ? saleStatus.hashCode() : 0);
        result = 31 * result + (spec != null ? spec.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "TMeMerchandiseInfoByMerchandiseId")
    public Collection<TMeInStockDetailsInfoEntity> getTMeInStockDetailsInfosByMerchandiseId() {
        return tMeInStockDetailsInfosByMerchandiseId;
    }

    public void setTMeInStockDetailsInfosByMerchandiseId(Collection<TMeInStockDetailsInfoEntity> tMeInStockDetailsInfosByMerchandiseId) {
        this.tMeInStockDetailsInfosByMerchandiseId = tMeInStockDetailsInfosByMerchandiseId;
    }

    @ManyToOne
    @JoinColumn(name = "MerchandiseCID", referencedColumnName = "MerchandiseCID")
    public TMeMerchandiseCInfoEntity getTMeMerchandiseCInfoByMerchandiseCid() {
        return tMeMerchandiseCInfoByMerchandiseCid;
    }

    public void setTMeMerchandiseCInfoByMerchandiseCid(TMeMerchandiseCInfoEntity tMeMerchandiseCInfoByMerchandiseCid) {
        this.tMeMerchandiseCInfoByMerchandiseCid = tMeMerchandiseCInfoByMerchandiseCid;
    }

    @ManyToOne
    @JoinColumn(name = "ProStatusID", referencedColumnName = "ProStatusID")
    public TMeProStatusInfoEntity getTMeProStatusInfoByProStatusId() {
        return tMeProStatusInfoByProStatusId;
    }

    public void setTMeProStatusInfoByProStatusId(TMeProStatusInfoEntity tMeProStatusInfoByProStatusId) {
        this.tMeProStatusInfoByProStatusId = tMeProStatusInfoByProStatusId;
    }

    @ManyToOne
    @JoinColumn(name = "UnitID", referencedColumnName = "UnitID")
    public TMeUnitInfoEntity getTMeUnitInfoByUnitId() {
        return tMeUnitInfoByUnitId;
    }

    public void setTMeUnitInfoByUnitId(TMeUnitInfoEntity tMeUnitInfoByUnitId) {
        this.tMeUnitInfoByUnitId = tMeUnitInfoByUnitId;
    }

    @OneToMany(mappedBy = "TMeMerchandiseInfoByMerchandiseId")
    public Collection<TMeOrderDetailsInfoEntity> getTMeOrderDetailsInfosByMerchandiseId() {
        return tMeOrderDetailsInfosByMerchandiseId;
    }

    public void setTMeOrderDetailsInfosByMerchandiseId(Collection<TMeOrderDetailsInfoEntity> tMeOrderDetailsInfosByMerchandiseId) {
        this.tMeOrderDetailsInfosByMerchandiseId = tMeOrderDetailsInfosByMerchandiseId;
    }

    @OneToMany(mappedBy = "TMeMerchandiseInfoByMerchandiseId")
    public Collection<TMeOutStockDetailsInfoEntity> getTMeOutStockDetailsInfosByMerchandiseId() {
        return tMeOutStockDetailsInfosByMerchandiseId;
    }

    public void setTMeOutStockDetailsInfosByMerchandiseId(Collection<TMeOutStockDetailsInfoEntity> tMeOutStockDetailsInfosByMerchandiseId) {
        this.tMeOutStockDetailsInfosByMerchandiseId = tMeOutStockDetailsInfosByMerchandiseId;
    }

    @OneToMany(mappedBy = "TMeMerchandiseInfoByMerchandiseId")
    public Collection<TMeStockInfoEntity> getTMeStockInfosByMerchandiseId() {
        return tMeStockInfosByMerchandiseId;
    }

    public void setTMeStockInfosByMerchandiseId(Collection<TMeStockInfoEntity> tMeStockInfosByMerchandiseId) {
        this.tMeStockInfosByMerchandiseId = tMeStockInfosByMerchandiseId;
    }
}
