const MyCarItem = (props) => {
  return (
    <div className="car-item col-lg-4 col-md-6 col-sm-12">
      <div className="thumb">
        <img src={props.car.image} alt="item" />
      </div>
      <div className="car-item-body">
        <div className="content">
          <h4 className="title">{props.car.name}</h4>
          <span className="price">Price:${props.car.price / 10 ** 24}</span>
          <p>{props.car.carDescription}</p>
          {props.car.isBought === true && props.car.isRented === false ? (
            <div>
              <a
                onClick={() => props.sellCar(props.car.id)}
                className="cmn-btn"
              >
                Sell Car
              </a>
            </div>
          ) : (
            <p>This car is in the market. Someone has to buy it</p>
          )}
        </div>
        <div className="car-item-meta">
          <ul className="details-list">
            <li>
              <i className="fa fa-car" />
              model 2014ib
            </li>
            <li>
              <i className="fa fa-tachometer" />
              32000 KM
            </li>
            <li>
              <i className="fa fa-sliders" />
              auto
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyCarItem;
