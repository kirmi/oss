package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by Administrator on 2014/11/17.
 */
@Entity
@Table(name = "TMe_OrderInfo")
public class TMeOrderInfoEntity {
    private int id;
    private String billCode;
    private String postBillCode;
    private byte billStatus;
    private Timestamp orderTime;
    private String recMan;
    private String linkTel;
    private String recAddress;
    private String postCode;
    private BigDecimal totalMoney;
    private String remark;
    private Collection<TMeOrderDetailsInfoEntity> tMeOrderDetailsInfosByBillCode;
    private TAuOperInfoEntity tAuOperInfoByOperId;
    private TBaDeliveryInfoEntity tBaDeliveryInfoByDeliveryId;
    private TBaMemberInfoEntity tBaMemberInfoByUserName;
    private TMeOutStockInfoEntity tMeOutStockInfoByOutBillCode;

    @Basic
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @Column(name = "BillCode")
    @GenericGenerator(name="system-uuid", strategy ="uuid")
    @GeneratedValue(generator="system-uuid")
    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
    }

    @Basic
    @Column(name = "PostBillCode")
    public String getPostBillCode() {
        return postBillCode;
    }

    public void setPostBillCode(String postBillCode) {
        this.postBillCode = postBillCode;
    }

    @Basic
    @Column(name = "BillStatus")
    public byte getBillStatus() {
        return billStatus;
    }

    public void setBillStatus(byte billStatus) {
        this.billStatus = billStatus;
    }

    @Basic
    @Column(name = "OrderTime")
    public Timestamp getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Timestamp orderTime) {
        this.orderTime = orderTime;
    }

    @Basic
    @Column(name = "RecMan")
    public String getRecMan() {
        return recMan;
    }

    public void setRecMan(String recMan) {
        this.recMan = recMan;
    }

    @Basic
    @Column(name = "LinkTel")
    public String getLinkTel() {
        return linkTel;
    }

    public void setLinkTel(String linkTel) {
        this.linkTel = linkTel;
    }

    @Basic
    @Column(name = "RecAddress")
    public String getRecAddress() {
        return recAddress;
    }

    public void setRecAddress(String recAddress) {
        this.recAddress = recAddress;
    }

    @Basic
    @Column(name = "PostCode")
    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    @Basic
    @Column(name = "TotalMoney")
    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TMeOrderInfoEntity that = (TMeOrderInfoEntity) o;

        if (billStatus != that.billStatus) return false;
        if (id != that.id) return false;
        if (billCode != null ? !billCode.equals(that.billCode) : that.billCode != null) return false;
        if (linkTel != null ? !linkTel.equals(that.linkTel) : that.linkTel != null) return false;
        if (orderTime != null ? !orderTime.equals(that.orderTime) : that.orderTime != null) return false;
        if (postBillCode != null ? !postBillCode.equals(that.postBillCode) : that.postBillCode != null) return false;
        if (postCode != null ? !postCode.equals(that.postCode) : that.postCode != null) return false;
        if (recAddress != null ? !recAddress.equals(that.recAddress) : that.recAddress != null) return false;
        if (recMan != null ? !recMan.equals(that.recMan) : that.recMan != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (totalMoney != null ? !totalMoney.equals(that.totalMoney) : that.totalMoney != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (billCode != null ? billCode.hashCode() : 0);
        result = 31 * result + (postBillCode != null ? postBillCode.hashCode() : 0);
        result = 31 * result + (int) billStatus;
        result = 31 * result + (orderTime != null ? orderTime.hashCode() : 0);
        result = 31 * result + (recMan != null ? recMan.hashCode() : 0);
        result = 31 * result + (linkTel != null ? linkTel.hashCode() : 0);
        result = 31 * result + (recAddress != null ? recAddress.hashCode() : 0);
        result = 31 * result + (postCode != null ? postCode.hashCode() : 0);
        result = 31 * result + (totalMoney != null ? totalMoney.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "TMeOrderInfoByBillCode")
    public Collection<TMeOrderDetailsInfoEntity> gettMeOrderDetailsInfosByBillCode() {
        return tMeOrderDetailsInfosByBillCode;
    }

    public void settMeOrderDetailsInfosByBillCode(Collection<TMeOrderDetailsInfoEntity> tMeOrderDetailsInfosByBillCode) {
        this.tMeOrderDetailsInfosByBillCode = tMeOrderDetailsInfosByBillCode;
    }

    @ManyToOne
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")
    public TAuOperInfoEntity getTAuOperInfoByOperId() {
        return tAuOperInfoByOperId;
    }

    public void setTAuOperInfoByOperId(TAuOperInfoEntity tAuOperInfoByOperId) {
        this.tAuOperInfoByOperId = tAuOperInfoByOperId;
    }

    @ManyToOne
    @JoinColumn(name = "DeliveryID", referencedColumnName = "DeliveryID")
    public TBaDeliveryInfoEntity getTBaDeliveryInfoByDeliveryId() {
        return tBaDeliveryInfoByDeliveryId;
    }

    public void setTBaDeliveryInfoByDeliveryId(TBaDeliveryInfoEntity tBaDeliveryInfoByDeliveryId) {
        this.tBaDeliveryInfoByDeliveryId = tBaDeliveryInfoByDeliveryId;
    }

    @ManyToOne
    @JoinColumn(name = "UserName", referencedColumnName = "UserName")
    public TBaMemberInfoEntity getTBaMemberInfoByUserName() {
        return tBaMemberInfoByUserName;
    }

    public void setTBaMemberInfoByUserName(TBaMemberInfoEntity tBaMemberInfoByUserName) {
        this.tBaMemberInfoByUserName = tBaMemberInfoByUserName;
    }

    @ManyToOne
    @JoinColumn(name = "OutBillCode", referencedColumnName = "OutBillCode")
    public TMeOutStockInfoEntity getTMeOutStockInfoByOutBillCode() {
        return tMeOutStockInfoByOutBillCode;
    }

    public void setTMeOutStockInfoByOutBillCode(TMeOutStockInfoEntity tMeOutStockInfoByOutBillCode) {
        this.tMeOutStockInfoByOutBillCode = tMeOutStockInfoByOutBillCode;
    }
}
