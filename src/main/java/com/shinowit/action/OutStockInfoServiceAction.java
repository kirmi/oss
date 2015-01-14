package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeOutStockDetailsInfoEntity;
import com.shinowit.entity.TMeOutStockInfoEntity;
import com.shinowit.service.OutStockInfoService;
import javax.annotation.Resource;
import java.util.List;

public class OutStockInfoServiceAction extends ActionSupport {

    @Resource
    private OutStockInfoService outStockInfoService;

    private TMeOutStockInfoEntity outstock;

    private List<TMeOutStockDetailsInfoEntity> chukuData;

    private boolean success;

    private boolean uotsttockquery;

    private String outstockmessage;

    public String outstockinsertlist(){

       boolean ousok= outStockInfoService.insertoutstock(outstock,chukuData);

        if(ousok==true){
            setSuccess(true);
            setUotsttockquery(true);
            setOutstockmessage("恭喜您出库单生成成功，信息将不能被随意修改");
        }else{
            setSuccess(false);
            setUotsttockquery(true);
            setOutstockmessage("出库单生成有误请返回页面重新输入");
        }
        return"outstocklist";
    }

    public TMeOutStockInfoEntity getOutstock() {
        return outstock;
    }

    public void setOutstock(TMeOutStockInfoEntity outstock) {
        this.outstock = outstock;
    }

    public List<TMeOutStockDetailsInfoEntity> getChukuData() {
        return chukuData;
    }

    public void setChukuData(List<TMeOutStockDetailsInfoEntity> chukuData) {
        this.chukuData = chukuData;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isUotsttockquery() {
        return uotsttockquery;
    }

    public void setUotsttockquery(boolean uotsttockquery) {
        this.uotsttockquery = uotsttockquery;
    }

    public String getOutstockmessage() {
        return outstockmessage;
    }

    public void setOutstockmessage(String outstockmessage) {
        this.outstockmessage = outstockmessage;
    }
}
