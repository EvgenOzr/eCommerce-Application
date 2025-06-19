import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { getProductsId } from "../../API/GetProductsId";
import { ProductProjection } from "@commercetools/platform-sdk";
import "./ProductDetailPage.scss";
import { ClockLoader } from "react-spinners";
import saleIcon from "../../assets/images/Product/sale-icon.png";
import ModalImage from "../../components/modal/ModalImage";
import { BreadcrumbsNav } from "../../components/BreadcrumbsNav/BreadcrumbsNav";
import { formatPrice } from "../../utils/formatPrice";
import Button from "../../components/button/Button";
import { ShopContext } from "../../context/shopContext";
import { addItemToCart } from "../../API/AddItemToCart";
import { CONVERT_CENT_USD } from "../../types/constants";
import { removeItemFromCart } from "../../API/RemoveItemFromCart";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [detailProduct, setDetailProduct] = useState<ProductProjection>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentModalIndex, setCurrentModalIndex] = useState(0);

  const { cart, setCart, isLoginned } = useContext(ShopContext);

  const productDiscount = detailProduct?.masterVariant?.prices?.[0].discounted;
  const imageUrlArray = detailProduct?.masterVariant.images;
  const hasImages = (detailProduct?.masterVariant.images?.length ?? 0) > 0;

  const goToNext = () => {
    if (!detailProduct?.masterVariant.images) return;
    const nextIndex =
      (currentImageIndex + 1) % detailProduct.masterVariant.images.length;
    setCurrentImageIndex(nextIndex);
  };

  const goToPrev = () => {
    if (!detailProduct?.masterVariant.images) return;
    const prevIndex =
      (currentImageIndex - 1 + detailProduct.masterVariant.images.length) %
      detailProduct.masterVariant.images.length;
    setCurrentImageIndex(prevIndex);
  };

  const modalNext = () => {
    if (!detailProduct?.masterVariant.images) return;
    const nextIndex =
      (currentModalIndex + 1) % detailProduct.masterVariant.images.length;
    setCurrentModalIndex(nextIndex);
    setSelectedImage(detailProduct.masterVariant.images[nextIndex].url);
  };

  const modalPrev = () => {
    if (!detailProduct?.masterVariant.images) return;
    const prevIndex =
      (currentModalIndex - 1 + detailProduct.masterVariant.images.length) %
      detailProduct.masterVariant.images.length;
    setCurrentModalIndex(prevIndex);
    setSelectedImage(detailProduct.masterVariant.images[prevIndex].url);
  };

  const openModal = (imageUrl: string | undefined) => {
    if (imageUrl) setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const isInCart = cart?.lineItems.some(
    (item) => item.productId === detailProduct?.id
  );
  const lineItem = cart?.lineItems.find(
    (item) => item.productId === detailProduct?.id
  );

  const handleCartAction = async () => {
    if (!detailProduct || !cart) return;

    try {
      if (isInCart && lineItem) {
        const updatedCart = await removeItemFromCart({
          cartId: cart.id,
          cartVersion: cart.version,
          lineItemId: lineItem.id,
          isAuthenticated: isLoginned,
        });
        setCart(updatedCart);
      } else {
        const updatedCart = await addItemToCart(
          cart.id,
          cart.version,
          detailProduct.id,
          detailProduct.masterVariant.id,
          isLoginned
        );
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

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
    document.body.style.overflow = selectedImage ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  });

  return (
    <section className="page-container">
      <BreadcrumbsNav />
      <div className="item-container">
        {detailProduct ? (
          <>
            <div className="item-container_images">
              <div className="item-container_images_slider">
                <button
                  onClick={() => goToPrev()}
                  className="item-container_images_slider_buttons left_button"
                >
                  &#10094;
                </button>
                <img
                  src={
                    detailProduct?.masterVariant.images?.[currentImageIndex].url
                  }
                  alt=""
                  className="item-container_images_file"
                  onClick={() =>
                    openModal(
                      detailProduct?.masterVariant?.images?.[currentImageIndex]
                        ?.url
                    )
                  }
                />
                <button
                  onClick={() => {
                    goToNext();
                  }}
                  className="item-container_images_slider_buttons right_button"
                >
                  &#10095;
                </button>
              </div>
              <div className="item-container_images_roll">
                {imageUrlArray?.slice(1).map((image, index) => (
                  <div className="item-container_images_roll_item" key={index}>
                    <img
                      src={image.url}
                      alt=""
                      className="item-container_images_roll_item_file"
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
                    {formatPrice(
                      (detailProduct?.masterVariant.prices?.[0].value
                        .centAmount ?? 0) / CONVERT_CENT_USD
                    )}{" "}
                    $
                  </p>
                  <img
                    src={saleIcon}
                    alt="sale-icon"
                    className="item-container_product_price_icon"
                  />
                  <p className="item-container_product_price_discount">
                    {formatPrice(
                      (detailProduct?.masterVariant.prices?.[0].discounted
                        ?.value.centAmount ?? 0) / CONVERT_CENT_USD
                    )}{" "}
                    $
                  </p>
                </div>
              ) : (
                <div className="item-container_product_price">
                  <p className="item-container_product_price_value">
                    {formatPrice(
                      (detailProduct?.masterVariant.prices?.[0].value
                        .centAmount ?? 0) / CONVERT_CENT_USD
                    )}{" "}
                    $
                  </p>
                </div>
              )}

              <p className="item-container_product_description">
                {detailProduct?.description?.["en-GB"]}
              </p>
              <Button
                value={isInCart ? "Delete from cart" : "Add to cart"}
                className={isInCart ? "delete" : "add"}
                onClick={handleCartAction}
              />
            </div>
            {selectedImage && hasImages && (
              <ModalImage
                closeModal={closeModal}
                selectedImage={selectedImage}
                modalNext={modalNext}
                modalPrev={modalPrev}
              />
            )}
          </>
        ) : (
          <div className="item-container_loader">
            <ClockLoader size={150} color="#8b4513" />
          </div>
        )}
      </div>
    </section>
  );
}
