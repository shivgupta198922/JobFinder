const Avatar = ({ src, alt, onClick, className = "" }) => (
  <div className={`relative cursor-pointer ${className}`} onClick={onClick}>
    <img
      src={src || "/profile.svg"}
      alt={alt || "User Avatar"}
      className="w-full h-full rounded-full border border-gray-300 object-cover"
    />
  </div>
);

export default Avatar;
