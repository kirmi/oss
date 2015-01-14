package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2014/11/17.
 */
@Entity
@Table(name = "TMe_StockInfo")
public class TMeStockInfoEntity {
    private int id;
    private BigDecimal avgPrice;
    private int num;
    private TMeMerchandiseInfoEntity tMeMerchandiseInfoByMerchandiseId;

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
    @Column(name = "AvgPrice")
    @GenericGenerator(name="system-uuid", strategy ="uuid")
    @GeneratedValue(generator="system-uuid")
    public BigDecimal getAvgPrice() {
        return avgPrice;
    }

    public void setAvgPrice(BigDecimal avgPrice) {
        this.avgPrice = avgPrice;
    }

    @Basic
    @Column(name = "Num")
    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TMeStockInfoEntity that = (TMeStockInfoEntity) o;

        if (id != that.id) return false;
        if (num != that.num) return false;
        if (avgPrice != null ? !avgPrice.equals(that.avgPrice) : that.avgPrice != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (avgPrice != null ? avgPrice.hashCode() : 0);
        result = 31 * result + num;
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
}
