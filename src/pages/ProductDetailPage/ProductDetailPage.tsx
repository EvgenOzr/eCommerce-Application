import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductsId } from "../../API/GetProductsId";
import { ProductProjection } from "@commercetools/platform-sdk";
import "./ProductDetailPage.scss";
import { ClockLoader } from "react-spinners";

export function ProductDetailPage() {
  const [detailProduct, setDetailProduct] = useState<ProductProjection>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    const fetchDetailProduct = async () => {
      try {
        const data = await getProductsId(id);
        setDetailProduct(data.body);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetailProduct();
  }, [id]);

  return (
    <section className="item-container">
      {detailProduct ? (
        <>
          <div className="item-container_image">
            <img
              src={detailProduct?.masterVariant.images?.[0].url}
              alt=""
              className="item-container_image_file"
            />
          </div>
          <div className="item-container_product">
            <h2 className="item-container_product_title">
              {detailProduct?.name["en-GB"]}
            </h2>
            <p className="item-container_product_price">
              {(detailProduct?.masterVariant.prices?.[0].value.centAmount ??
                0) / 100}{" "}
              $
            </p>
            <p className="item-container_product_description">
              {detailProduct?.description?.["en-GB"]}
            </p>
          </div>
        </>
      ) : (
        <div className="item-container_loader">
          <ClockLoader size={150} color="#8b4513" />
        </div>
      )}
    </section>
  );
}
