import React, { useEffect, useState } from 'react'
import {  useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import "../styles/dashboard.css"

export default function Dashboard() {

    const [error,setError]=useState("")
    const {currentUser , logout}=useAuth()
    const history=useHistory()
    const [term,setTerm]=useState("election");
    const [articles,setArticles]=useState([])
    const [loading,setLoading]=useState(true)
    const articles_url=`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=pEC5XetznThEWs5nHGVCL28d7M8iMUC8`;

    const [text,setText]=useState("")

    useEffect(()=>{
        const fetchArticles=async ()=>{
        try {
                const res=await fetch(articles_url)
                const articles=await res.json()
                console.log(articles);

                setArticles(articles.response.docs)
                setLoading(false)
            }
        catch (error) {
            console.log(error)
        }}
        fetchArticles()
    },[term])


    async function handleLogout(){
        setError("")
    
        try{
            await logout()
            history.push("/login")
        }catch{
            setError("Falied to sign out!")
        }
    }

    const handleSearch=(e)=>{
        e.preventDefault()

        setTerm(text)
        setLoading(true)
    }

    return (
        <>

        <nav className="navbar navbar-light bg-light" style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
          <form className="form-inline" onSubmit={handleSearch}>
            <input className="search" type="search" onChange={(e)=>setText(e.target.value)}  placeholder="Search for blogs ... eg. politics ..."  />
            <button className="btn btn-outline-success my-2 my-sm-0"  type="submit" >Search</button>
            <button className="btn btn-outline-danger my-2 my-sm-0" style={{marginLeft:"40px"}} type="submit"  onClick={handleLogout}>Log Out</button>
          </form>
        </nav>
        
        <div className="showcase">
            <div className="overlay">
                <h1 className="overlay-text capitalize">Viewing articles about {term}</h1>

            </div>
        </div>

        {
            loading ? <h1 className="loading">Loading...</h1> :
            <section className="content">
            {articles.map((article)=>{
                const {abstract,headline:{main},byline:{original},lead_paragraph,web_url,_id}=article
                return(
                    <article key="_id" className="article">
                        <h2 className="title">{main}</h2>
                        <h4 className="abstract">{abstract}</h4>
                        <p className="para">{lead_paragraph}</p>
                        <ul>
                            <li className="author">{original}</li>
                        </ul>
                        <a href={web_url} target="_blank" className="resource" ><u>Web Resource</u></a>
                    </article>
                )
            })}
        </section>
        }
            {/*<Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email :</strong>{currentUser.email}
                    <Link to="update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Sign Out</Button>
            </div>*/}
        </>
    )
}
