
import com.shinowit.entity.TMeMerchandiseInfoEntity;
import org.junit.runner.RunWith;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.sql.Types;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:application-context.xml"})
public class Test {
    @Resource
    private JdbcTemplate jt;
    public boolean test1(){
        boolean result=false;
        String sql1="insert into TMeMerchandiseInfoEntity(MerchandiseID,UnitID,ProStatusID,MerchandiseCID,MerchandiseName,Price,SaleStatus)values(?,1,1,1,'mianbao','面包',100,True)";
       for(int i=0;i<=100000;i++){
           TMeMerchandiseInfoEntity ee=new TMeMerchandiseInfoEntity();
           //jt.update(sql1,new Object[]{ee.getMerchandiseId(String.valueOf(i))},new int[]{Types.VARCHAR,});
           result=true;
       }
        return result;
    }
}
