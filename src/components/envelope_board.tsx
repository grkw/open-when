import Envelope from "@/components/envelope";
import styles from '@/components/envelope_board.module.css';

export default function EnvelopeBoard() {

    return (<table className={styles.table}>
    <tbody>
    <tr>
        <td className={styles['col-1']}><Envelope prompt="you feel blue" opened={false} text="" image_id="" className="custom-envelope-class"></Envelope></td>
        <td className={styles['col-2']}><Envelope prompt="you feel lost" opened={false} text="" image_id="" className="custom-envelope-class"></Envelope></td>
        <td className={styles['col-3']}><Envelope prompt="you messed up" opened={false} text="" image_id="" className="custom-envelope-class"></Envelope></td>
    </tr>
    <tr>
        <td className={styles['col-1']}><Envelope prompt="you need a laugh" opened={false} text="" image_id="" className="custom-envelope-class"></Envelope></td>
        <td className={styles['col-2']}><Envelope prompt="you're exhausted" opened={false} text="" image_id="" className="custom-envelope-class"></Envelope></td>
        <td className={styles['col-3']}><Envelope prompt="you're pissed off" opened={false} text="" image_id="" className="custom-envelope-class"></Envelope></td>
    </tr>
    <tr>
        <td className={styles['col-1']}><Envelope prompt="you feel lonely" opened={false} text="" image_id="" className="custom-envelope-class"></Envelope></td>
        <td className={styles['col-2']}><Envelope prompt="you feel stressed" opened={false} text="" image_id="" className="custom-envelope-class"></Envelope></td>
        <td className={styles['col-3']}><Envelope prompt="..." opened={false} text="" image_id="" className="custom-envelope-class"></Envelope></td>
    </tr>
    </tbody>
    </table>);

}