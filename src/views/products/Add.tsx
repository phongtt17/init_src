import { ChangeEvent, Fragment, useState } from 'react';

import one from '@/assets/images/pro3/1.jpg';

import Breadcrumb from '@/layout/Breadcrumb';

const AddProduct = (): JSX.Element => {
  const [file, setFile] = useState(one);
  const [quantity, setQuantity] = useState(1);
  const IncrementItem = (): void => {
    if (quantity < 9) {
      setQuantity(quantity + 1);
    }
  };
  const DecreaseItem = (): void => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => {
    setQuantity(parseInt(value));
  };

  //	image upload
  const _handleImgChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const reader = new FileReader();
    const image = e?.target?.files?.[0];
    reader.onload = () => {
      setFile(reader.result as string);
    };
    reader.readAsDataURL(image as File);
  };

  const handleValidSubmit = (): void => {
    // TODO
  };
  return (
    <Fragment>
      <Breadcrumb title="Add Product" parent="Products" />
      {/* <div className="max-w-full mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 xl:w-5/12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="product-adding">
                <div className="relative">
                  <input className="absolute w-full h-full opacity-0" type="file" onChange={(e) => _handleImgChange(e)} />
                  <img src={file} alt="" className="block object-cover object-center w-full h-full rounded-lg shadow-md" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-7/12">
            <form className="needs-validation" onSubmit={handleValidSubmit}>
              <div className="form form-label-center">
                <div className="form-group mb-3">
                  <label className="mb-0">Product Name :</label>
                  <input className="form-control" name="product_name" id="validationCustom01" type="text" required />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="form-group mb-3">
                  <label className="mb-0">Price :</label>
                  <input className="form-control mb-0" name="price" id="validationCustom02" type="number" required />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="form-group mb-3">
                  <label className="mb-0">Product Code :</label>
                  <input className="form-control" name="product_code" id="validationCustomUsername" type="number" required />
                  <div className="invalid-feedback">Please choose Valid Code.</div>
                </div>
              </div>
              <div className="form">
                <div className="form-group mb-3">
                  <label className="mb-0">Select Size :</label>
                  <select className="form-control digits" id="exampleFormControlSelect1">
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                    <option>Extra Large</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label className="mb-0">Total Products :</label>
                  <fieldset className="qty-box ms-0">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <button className="btn btn-primary btn-square bootstrap-touchspin-down" type="button" onClick={DecreaseItem}>
                          <i className="fa fa-minus"></i>
                        </button>
                      </div>
                      <input className="form-control touchspin" type="text" value={quantity} onChange={handleChange} />
                      <div className="input-group-append">
                        <button className="btn btn-primary btn-square bootstrap-touchspin-up" type="button" onClick={IncrementItem}>
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
                  Add
                </button>
                <Button type="button" color="light">
                  Discard
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </Fragment>
  );
};

export default AddProduct;
