import Card from "@/components/card";
import styles from '@/components/card_board.module.css';

export default function CardBoard() {

    return (<table className={styles.table}>
    <tbody>
    <tr>
        <td className={styles['col-1']}><Card prompt="you feel blue" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
        <td className={styles['col-2']}><Card prompt="you feel lost" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
        <td className={styles['col-3']}><Card prompt="you messed up" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
    </tr>
    <tr>
        <td className={styles['col-1']}><Card prompt="you need a laugh" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
        <td className={styles['col-2']}><Card prompt="you're exhausted" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
        <td className={styles['col-3']}><Card prompt="you're pissed off" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
    </tr>
    <tr>
        <td className={styles['col-1']}><Card prompt="you feel lonely" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
        <td className={styles['col-2']}><Card prompt="you feel stressed" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
        <td className={styles['col-3']}><Card prompt="..." opened={false} text="" image_id="" className="custom-card-class"></Card></td>
    </tr>
    </tbody>
    </table>);

}