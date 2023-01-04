import Navigate from '../Navigate';

function SideBar({ routes }) {
    return (
        <>
            {routes.map((item, index) => {
                return (
                    <Navigate key={index} to={item.to} content={item.content} />
                );
            })}
        </>
    );
}

export default SideBar;
