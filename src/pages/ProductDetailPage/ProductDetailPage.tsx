import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductsId } from "../../API/GetProductsId";
import { ProductProjection } from "@commercetools/platform-sdk";
import "./ProductDetailPage.scss";
import { ClockLoader } from "react-spinners";
import saleIcon from "../../assets/images/Product/sale-icon.png";
import ModalImage from "../../components/ModalImage/ModalImage";

export function ProductDetailPage() {
  const [detailProduct, setDetailProduct] = useState<ProductProjection>();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (imageUrl: string | undefined) => {
    if (imageUrl) setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

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

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  });

  const productDiscount = detailProduct?.masterVariant?.prices?.[0].discounted;
  const imageUrlArray = detailProduct?.masterVariant.images;

  return (
    <section className="item-container">
      {detailProduct ? (
        <>
          <div className="item-container_image">
            <img
              src={detailProduct?.masterVariant.images?.[0].url}
              alt=""
              className="item-container_image_file"
              onClick={() =>
                openModal(detailProduct?.masterVariant?.images?.[0]?.url)
              }
            />
            <div className="item-container_image_roll">
              {imageUrlArray?.slice(1).map((image, index) => (
                <div className="item-container_image_roll_item" key={index}>
                  <img
                    src={image.url}
                    alt=""
                    className="item-container_image_roll_item_file"
                    onClick={() => openModal(image.url)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="item-container_product">
            <h2 className="item-container_product_title">
              {detailProduct?.name["en-GB"]}
            </h2>
            {productDiscount ? (
              <div className="item-container_product_price">
                <p className="item-container_product_price_value discounted">
                  {(detailProduct?.masterVariant.prices?.[0].value.centAmount ??
                    0) / 100}{" "}
                  $
                </p>
                <img
                  src={saleIcon}
                  alt="sale-icon"
                  className="item-container_product_price_icon"
                />
                <p className="item-container_product_price_discount">
                  {(detailProduct?.masterVariant.prices?.[0].discounted?.value
                    .centAmount ?? 0) / 100}{" "}
                  $
                </p>
              </div>
            ) : (
              <div className="item-container_product_price">
                <p className="item-container_product_price_value">
                  {(detailProduct?.masterVariant.prices?.[0].value.centAmount ??
                    0) / 100}{" "}
                  $
                </p>
              </div>
            )}

            <p className="item-container_product_description">
              {detailProduct?.description?.["en-GB"]}
            </p>
          </div>
          {selectedImage && (
            <ModalImage closeModal={closeModal} selectedImage={selectedImage} />
          )}
        </>
      ) : (
        <div className="item-container_loader">
          <ClockLoader size={150} color="#8b4513" />
        </div>
      )}
    </section>
  );
}
