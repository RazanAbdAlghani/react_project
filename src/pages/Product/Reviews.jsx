import React, { useContext, useEffect, useState } from 'react'
import Rating from '../../components/Rating/Rating';
import { Bounce, toast } from 'react-toastify';
import Styles from './Product.module.css';
import UserRating from '../../components/Rating/UserRating';
import { UserContext } from '../../context/User';
import { object, string } from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/component/Loader';

function Reviews({productId}) {
  const [reviews, setReviews]= useState([]);
  const [loader , setLoader] = useState(true);
  const [error ,setError] = useState('');
    const [review, setReview] = useState({
        comment: '',
        rating: localStorage.getItem("userRating"),
    });
    const [errors, setErrors] = useState([]);
    const [isloading, setIsLoading] = useState(false);

    const getData= async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
        console.log(data.product.reviews);
        setReviews(data.product.reviews);
      } catch (error) {
        console.log(error);
        setError('Error to Loade Data!');
      } finally {
        setLoader(false);
      }
    };

    useEffect(()=>{
      getData();
    },[]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview({
          ...review,
          [name]: value
        });
      }

        const validateData = async () => {
            const CommentSchema = object({
              comment: string().max(225),
            });
        
            try {
              await CommentSchema.validate(review, { abortEarly: false });
              return true;
            }
            catch (error) {
              const validationErrors = {};
              error.inner.forEach(err => {
                // console.log(err.path); key برجع
                validationErrors[err.path] = err.message;
                setErrors(validationErrors);
              });
              setIsLoading(false);
              return false;
            }
          };

          const handleComment = async (e) => {
            e.preventDefault();
            console.log(review);
        
            setLoader(true);
            if (await validateData()) {
              try {
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/products/${productId}/review`,review,
                {
                    headers: {
                        Authorization: `Tariq__${localStorage.getItem('userToken')}`
                      }
                }
                );
                console.log(data);
                setReview({
                  comment: '',
                  rating: null,
                });
        
                if (data.message == "success") {
                  toast.success('review created ', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                  });
                  getData();
                  
                }
              } catch (error) {
                console.log(error);
              } finally {
                setIsLoading(false);
              }
            }
          }
          if(loader){
            return <Loader />
          };
    return (
        <>
         <Link className="link-underline-secondary text-secondary fs-6 d-block mt-3 " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  Reviews
                </Link>
                <div className="modal" tabIndex={-1} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title text-secondary">Comments</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                      </div>
                      <div className="modal-body">
                        {error?? <p>{error}</p>}
                        {reviews.map(rev=>
                          <div className={`${Styles.revCard} p-3`} key={rev._id}>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="user d-flex flex-row align-items-center gap-3">
                              <img src={rev.createdBy.image.secure_url} width={30} className={`${Styles.revUserImg} rounded-circle mr-2`} />
                              <span><small className="fw-bold text-primary">{rev.createdBy.userName}</small> <small className="fw-bold">{rev.comment}</small></span>
                            </div>
                            <small style={{fontSize:"9px"}}>{rev.createdAt}</small>
                          </div>
                          <div className="action d-flex justify-content-between mt-2 align-items-center">
                            <div className={`${Styles.reply} px-4`}>
                              <span className="dots" />
                              <small>Reply</small>
                            </div>
                            <div className="icons align-items-center p-1">
                              <Rating index={rev.rating} size={20} />
                            </div>
                          </div>
                        </div>
                                 
                          )}   

                    {/*Add review */}
                    <div className={`${Styles.revCard} p-3`}>
                <form onSubmit={handleComment}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Add Review</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1"  rows={2} name="comment" defaultValue={review.comment} onChange={handleChange} placeholder="your comment.."/>
                        <p className='text-danger'>{errors.comment}</p>
                        <UserRating />
                    </div>
                    <div className='d-flex justify-content-center'>
              <button type="submit" className="btn btn-sm  p-2 d-flex align-items-center justify-content-center text-light btn-warning rounded-pill" style={{ width: "140px" }} disabled={isloading ? 'disabled' : null}>{isloading ? "wait..." : "comment"}</button>
            </div>

                </form>
            </div>
                  </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
        </>
    )
}

export default Reviews