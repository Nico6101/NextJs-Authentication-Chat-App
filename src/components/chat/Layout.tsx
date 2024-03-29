export { Layout };

function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <div className="col-md-6 offset-md-3 mt-5">
            {children}
        </div>
    );
}