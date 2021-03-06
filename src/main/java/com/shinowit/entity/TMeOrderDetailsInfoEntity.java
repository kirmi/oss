package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2014/11/17.
 */
@Entity
@Table(name = "TMe_OrderDetailsInfo")
public class TMeOrderDetailsInfoEntity {
    private int id;
    private Integer num;
    private BigDecimal price;
    private TMeMerchandiseInfoEntity tMeMerchandiseInfoByMerchandiseId;
    private TMeOrderInfoEntity tMeOrderInfoByBillCode;
    private TMeUnitInfoEntity tMeUnitInfoByUnitId;

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "Num")
    @GenericGenerator(name="system-uuid", strategy ="uuid")
    @GeneratedValue(generator="system-uuid")
    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    @Basic
    @Column(name = "Price")
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TMeOrderDetailsInfoEntity that = (TMeOrderDetailsInfoEntity) o;

        if (id != that.id) return false;
        if (num != null ? !num.equals(that.num) : that.num != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (num != null ? num.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "MerchandiseID", referencedColumnName = "MerchandiseID")
    public TMeMerchandiseInfoEntity getTMeMerchandiseInfoByMerchandiseId() {
        return tMeMerchandiseInfoByMerchandiseId;
    }

    public void setTMeMerchandiseInfoByMerchandiseId(TMeMerchandiseInfoEntity tMeMerchandiseInfoByMerchandiseId) {
        this.tMeMerchandiseInfoByMerchandiseId = tMeMerchandiseInfoByMerchandiseId;
    }

    @ManyToOne
    @JoinColumn(name = "BillCode", referencedColumnName = "BillCode")
    public TMeOrderInfoEntity getTMeOrderInfoByBillCode() {
        return tMeOrderInfoByBillCode;
    }

    public void setTMeOrderInfoByBillCode(TMeOrderInfoEntity tMeOrderInfoByBillCode) {
        this.tMeOrderInfoByBillCode = tMeOrderInfoByBillCode;
    }

    @ManyToOne
    @JoinColumn(name = "UnitID", referencedColumnName = "UnitID")
    public TMeUnitInfoEntity getTMeUnitInfoByUnitId() {
        return tMeUnitInfoByUnitId;
    }

    public void setTMeUnitInfoByUnitId(TMeUnitInfoEntity tMeUnitInfoByUnitId) {
        this.tMeUnitInfoByUnitId = tMeUnitInfoByUnitId;
    }
}
