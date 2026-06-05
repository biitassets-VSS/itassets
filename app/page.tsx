export default function Home() {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center',
      backgroundColor: '#1a1a1a',
      color: 'white',
      minHeight: '100vh'
    }}>
      <h1>🎉 IT ASSETS HOMEPAGE WORKS!</h1>
      <p>If you can see this, the homepage is working!</p>
      <br />
      <a href="/admin/login" style={{ 
        color: 'lightblue', 
        padding: '10px 20px',
        backgroundColor: '#333',
        textDecoration: 'none',
        borderRadius: '5px',
        margin: '10px'
      }}>
        Admin Login
      </a>
      <br /><br />
      <a href="/staff/login" style={{ 
        color: 'lightgreen', 
        padding: '10px 20px',
        backgroundColor: '#333',
        textDecoration: 'none',
        borderRadius: '5px',
        margin: '10px'
      }}>
        Staff Login  
      </a>
    </div>
  );
}
