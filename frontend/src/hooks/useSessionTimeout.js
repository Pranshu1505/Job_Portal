import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { toast } from "sonner"

const useSessionTimeout = () => {
    const { tokenExpiresAt, user } = useSelector(store => store.auth);
    const warnedRef = useRef(false);

    useEffect(() => {
        console.log("tokenExpiresAt:", tokenExpiresAt, "user:", user);
        if(!tokenExpiresAt || !user){
            warnedRef.current = false;
            return;
        }

        const checkExpiry = () => {
            const timeLeft = tokenExpiresAt - Date.now();
            const fiveMinutes = 5 * 60 * 1000;

            if(timeLeft <= 0){
                warnedRef.current = false;
                return;
            }

            if(timeLeft <= fiveMinutes && !warnedRef.current){
                warnedRef.current = true;
                const minutesLeft = Math.ceil(timeLeft / 60000);
                toast.warning(`Your session is expiring in ${minutesLeft} minute(s). Please save your work and login again.`, {
                    duration: 10000
                });
            }
        }

        checkExpiry();
        const interval = setInterval(checkExpiry, 30 * 1000); // check every 30 seconds

        return () => clearInterval(interval);
    }, [tokenExpiresAt, user]);
}

export default useSessionTimeout