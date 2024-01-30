import "rsuite/dist/rsuite.min.css";
import { RangeSlider } from "rsuite";
import queryString from "query-string";

import { useLocation, useNavigate } from "react-router-dom";

function PriceRange() {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const navigate = useNavigate();
  console.log(location);

  return (
    <div className="">
      <RangeSlider
        min={300}
        max={22000}
        barClassName={"text-[#282828] "}
        onChangeCommitted={(e) => {
          let [min, max] = e; 
          parsed.minV = min;
          parsed.maxV = max;
          navigate(`${location.pathname}?${queryString.stringify(parsed)}`);
        }}
        // renderMark={}
        defaultValue={[700, 3000]}
        className="text-black"
      />
    </div>
  );
}

export default PriceRange;
