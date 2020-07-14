import ProvinceRaw from './province.json'
import DistrictRaw from './district.json'
var District = {};

Object.entries(ProvinceRaw).map(([i,v]) => {
    var concobebe = [];
    Object.entries(DistrictRaw).map(([dI,dV]) => {
            if (dV.parent_code == i) {
                concobebe.push(dV.name_with_type) 
            }
        }
    );
    District[v.name] = concobebe
    }
)
var tProvince = {};
Object.entries(ProvinceRaw).map(([i,v]) => {
    tProvince[v.name] = i
})
var Province = {};
Object.keys(tProvince).sort().forEach( key => {
    Province[key] = tProvince[key];
});
  
  

export default {Province,District}
