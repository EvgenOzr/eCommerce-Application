import { useEffect } from "react";
import { useParams } from "react-router";
import { getProductsId } from "../../API/GetProductsId";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    const fetchDetailProduct = async () => {
      try {
        const data = await getProductsId(id);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetailProduct();
  }, [id]);

  return <div>ProductDetailPage</div>;
}
