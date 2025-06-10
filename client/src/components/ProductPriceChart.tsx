import { useEffect } from "react";

function ProductPriceChart() {
  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then(res => res.json())
      .then(data => console.log(data.users));
  }, []);

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Top 10 Product Prices</h2>
      <div style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
}

export default ProductPriceChart;
