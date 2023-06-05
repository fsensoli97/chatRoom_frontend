import './Logout.css'

export default function Logout({setToken, id}) {
  function handleLogout() {
    sessionStorage.removeItem("token");
    setToken(null);

    fetch(`http://localhost:2000/logout?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(
        {
          isOnline: false
        }
      )
    })
  }

  return (
    <div className='logoutContainer'>
      <button className="logout" onClick={handleLogout}>Log out</button>
    </div>
  );
}