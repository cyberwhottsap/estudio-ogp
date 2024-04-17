interface Props {
  img: string;
  title: string;
  description: string;
  url: string;
}

export const Card = ({ img, title, description, url }: Props) => (
  <div className="card w-full bg-base-100 shadow-xl">
    <figure>
      <img src={img} alt="" width={384} height={512} />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <p>{description}</p>
      <div className="card-actions justify-end">
        <a href={url}>
          <button className="btn btn-primary btn-sm">Ir a nota</button>
        </a>
      </div>
    </div>
  </div>
);
