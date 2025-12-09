import { Link, useNavigate } from "react-router-dom";
import '../Css/Header.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { UserService } from "../Services/UserService";
import { Button, Container } from "semantic-ui-react";
import { useEffect, useRef, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

function useDebounce<T>(value: T, delay = 300) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);
    return debounced;
}

type Role = "Student" | "Employer" | "Admin";

interface SearchResult {
    id: string;
    userName: string;
    email: string;
    name?: string; 
    companyName?: string; 
}

function getSearchTargetRole(userRole: Role): Role {
    if (userRole === "Student") return "Employer";
    if (userRole === "Employer") return "Student";
    return "Student"; 
}

async function apiSearch(role: Role, query: string, skip = 0, take = 20): Promise<SearchResult[]> {
    if (!query || query.trim().length === 0) return [];
    
    const API_BASE = "https://localhost:7085";
    const url = new URL(`${API_BASE}/api/User/search`);
    
    console.log("🔍 Searching for role:", role); 
    console.log("🔍 Search query:", query); 
    
    url.searchParams.set("role", role);
    url.searchParams.set("query", query);
    url.searchParams.set("skip", String(skip));
    url.searchParams.set("take", String(take));

    try {
        console.log("🔍 API URL:", url.toString());
        
        const res = await fetch(url.toString());
        
        console.log("🔍 Response status:", res.status);
        
        if (!res.ok) {
            const errorText = await res.text();
            console.error("🔍 HTTP error details:", errorText);
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const text = await res.text();
        console.log("🔍 Raw response:", text); 
        
        if (!text || text.trim() === "") {
            console.log("🔍 Empty response");
            return [];
        }
        
        const data = JSON.parse(text);
        console.log("🔍 Parsed data:", data);
        console.log("🔍 Number of results:", data.length);
        
        data.forEach((result: SearchResult, index: number) => {
            console.log(`🔍 Result ${index + 1}:`, result);
        });
        
        return data as SearchResult[];
    } catch (error) {
        console.error("🔍 Search API error:", error);
        throw error;
    }
}

export function Header(){
    function getRoleFromStorage(): Role {
        const role = localStorage.getItem('role');
        switch (role) {
            case "Admin": return "Admin";
            case "Employer": return "Employer";
            case "Student": return "Student";
            default: return "Student";
        }
    }

    const userRole = getRoleFromStorage();
    const navigate = useNavigate();

    function LogOut(){
          UserService.Logout();
          setTimeout(()=>{
            navigate("/");
          },1000)
        }
    return(
        <header className="d-flex justify-content-around align-items-center">
            <Navbar variant="dark" expand="lg" sticky="top" >
            <Container>
            <Navbar.Brand as={Link} to="/Home" className="brand-colored">
                <h1 className="bolder">LITA</h1>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
            <Nav.Link className="mx-2 mx-md-4 nav-link" as={Link} to="/Home">Home</Nav.Link>
            <Nav.Link className="mx-2 mx-md-4 nav-link" as={Link} to="/AboutUs">About Us</Nav.Link>
            {userRole === "Employer" && <Nav.Link className="mx-2 mx-md-4 nav-link" as={Link} to="/Jobs">Jobs</Nav.Link>}
            {userRole === "Student" && <Nav.Link className="mx-2 mx-md-4 nav-link" as={Link} to="/FindJob">Find Job</Nav.Link>}
            {userRole === "Student" && <Nav.Link className="mx-2 mx-md-4 nav-link" as={Link} to="/StudentProfile">Profile</Nav.Link>}
            {userRole === "Admin" && <Nav.Link className="mx-2 mx-md-4 nav-link" as={Link} to="/AdminDashboard">Dashboard</Nav.Link>}
            {userRole === "Employer" && <Nav.Link className="mx-2 mx-md-4 nav-link" as={Link} to="/EmployerProfile">Profile</Nav.Link>}
            <SearchBar role={userRole}  />
             <Button
            type="button" className="mx-2 mx-md-4 nav-link"
            onClick={LogOut}>
                LogOut
             </Button>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </header>
        
    );
}

function SearchBar({ role }: { role: Role }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (open && 
                inputRef.current && 
                !inputRef.current.contains(e.target as Node) &&
                modalRef.current && 
                !modalRef.current.contains(e.target as Node)) {
                setOpen(false);
                setQuery("");
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    return (
        <div className="search-container position-relative">
            <input
                ref={inputRef}
                onFocus={() => setOpen(true)}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                placeholder={role === "Employer" ? "Search students..." : "Search employers..."}
                className="search-input form-control"
                style={{ minWidth: "200px" }}
            />
            {open && (
                <>
                    <div 
                        className="modal-backdrop show"
                        style={{ 
                            zIndex: 1040,
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)'
                        }}
                        onClick={() => {
                            setOpen(false);
                            setQuery("");
                        }}
                    />
                    
                    <div 
                        ref={modalRef}
                        className="position-fixed"
                        style={{ 
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1050,
                            width: "400px",
                            maxWidth: "90vw",
                            maxHeight: "80vh"
                        }}
                    >
                        <SearchModal
                            role={role}
                            initialQuery={query}
                            onClose={() => { 
                                setOpen(false); 
                                setQuery(""); 
                                inputRef.current?.blur(); 
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

function SearchModal({ 
    role, 
    initialQuery, 
    onClose,
}: { 
    role: Role; 
    initialQuery: string; 
    onClose: () => void;
}) {
    const navigate = useNavigate();
    const [query, setQuery] = useState(initialQuery || "");
    const debouncedQuery = useDebounce(query, 300);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [skip, setSkip] = useState(0);
    const take = 20;
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let cancelled = false;

        async function run() {
            if (!debouncedQuery || debouncedQuery.trim().length === 0) {
                setResults([]);
                setError(null);
                setLoading(false);
                setSkip(0);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const targetRole = getSearchTargetRole(role);
                const data = await apiSearch(targetRole, debouncedQuery, 0, take);
                if (!cancelled) {
                    setResults(data);
                    setSkip(data.length);
                }
            } catch (e: any) {
                if (!cancelled) setError(e.message || "Search error");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        run();
        return () => { cancelled = true; };
    }, [debouncedQuery, role]);

    const loadMore = async () => {
        try {
            setLoading(true);
            const targetRole = getSearchTargetRole(role);
            const more = await apiSearch(targetRole, debouncedQuery, skip, take);
            setResults((s) => [...s, ...more]);
            setSkip((s) => s + more.length);
        } catch (e: any) {
            setError(e.message || "Could not load more");
        } finally {
            setLoading(false);
        }
    };

    const handleResultClick = (result: SearchResult) => {
        console.log(`Navigating to profile: ${result.id}`);
        onClose(); 
        navigate(`/profile/${result.id}`);
    };

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
    };

    return (
        <div 
            ref={modalRef}
            className="search-modal bg-white rounded shadow-lg border d-flex flex-column"
            style={{ maxHeight: "80vh" }}
            onClick={handleModalClick}
        >
            <div className="p-3 border-bottom">
                <div className="d-flex align-items-center gap-2">
                    <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={role === "Employer" ? "Type student name / email / username..." : "Type company / email / username..."}
                        className="form-control border-0"
                        style={{ outline: "none", boxShadow: "none" }}
                        onClick={handleModalClick}
                    />
                    <button 
                        onClick={(e) => {
                            handleModalClick(e);
                            onClose();
                        }}
                        className="btn close btn-link text-dark p-0 ms-2"
                        style={{ fontSize: "1.5rem" }}
                    >
                        &times;
                    </button>
                </div>
            </div>

            <div className="modal-results flex-grow-1 overflow-auto">
                {!debouncedQuery || debouncedQuery.trim().length === 0 ? (
                    <div className="text-center p-4 text-muted">
                        Start typing to search...
                    </div>
                ) : loading && results.length === 0 ? (
                    <div className="text-center p-4">
                        <div className="spinner-border spinner-border-sm text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <span className="ms-2">Searching...</span>
                    </div>
                ) : error ? (
                    <div className="text-center text-danger p-4">
                        <i className="bi bi-exclamation-circle me-2"></i>
                        {error}
                    </div>
                ) : results.length === 0 ? (
                    <div className="text-center p-4 text-muted">
                        No results found
                    </div>
                ) : (
                    <>
                        <div className="list-group list-group-flush">
                            {results.map((result) => (
                                <button
                                    key={result.id}
                                    onClick={(e) => {
                                        handleModalClick(e);
                                        handleResultClick(result);
                                    }}
                                    className="list-group-item list-group-item-action border-0 py-3 px-3 text-start"
                                >
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <div className="fw-bold text-dark">
                                                {result.name || result.companyName || result.userName}
                                            </div>
                                            <small className="text-muted">
                                                {result.email}
                                            </small>
                                        </div>
                                        <div className="text-muted small">
                                            {result.name ? "Student" : "Employer"}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {results.length >= take && (
                            <div className="text-center p-3 border-top">
                                <button
                                    onClick={(e) => {
                                        handleModalClick(e);
                                        loadMore();
                                    }}
                                    disabled={loading}
                                    className="btn btn-outline-primary btn-sm"
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" />
                                            Loading...
                                        </>
                                    ) : (
                                        "Load More"
                                    )}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}