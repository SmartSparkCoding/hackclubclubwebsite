from urllib.request import urlopen

from flask import Flask, json, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/showcase')
def showcase():
    return render_template('showcase.html')

@app.route('/leadership')
def leadership():
    return render_template('leadership.html')

@app.route('/socsGuide')
def socsGuide():
    return render_template('socsGuide.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/finances')
def finances():
    return render_template('hcb.html')

def getHCBData():
    slug = os.getenv("HCB_ORG_SLUG", "ashford-school-hack-club")
    url = f"https://hcb.hackclub.com/api/v3/organizations/{slug}"

    fallback = {
        "ok": False,
        "org_name": "HCB",
        "org_slug": slug,
        "manager_name": "Unknown",
        "balance_cents": 0,
        "balance_display": "$0.00",
        "fee_balance_cents": 0,
        "incoming_balance_cents": 0,
        "total_raised_cents": 0,
        "total_raised_display": "$0.00",
        "website": "",
        "hcb_url": f"https://hcb.hackclub.com/{slug}",
        "logo": "",
        "error": None, 
    }

    def cents_to_display(cents):
        return f"${(cents or 0)/100:.2f}"
    
    try:
        req = Request(url, headers={"Accept": "application/json"}, method="GET")
        with urlopen(req, timeout=10) as resp:
            raw = resp.read().decode("utf-8")
            data = json.loads(raw)

        balances = data.get("balances") or {}
        users = data.get("users") or []

        manager_name = "Unknown"
        for u in users:
            if isinstance(u, dict) and (u.get("full_name") or u.get("name")):
                manager_name = u.get("full_name") or u.get("name")
                break
        if manager_name == "Unknown" and users:
            u0 = users[0]
            if isinstance(u0, dict):
                manager_name = u0.get("name") or u0.get("id") or "Unknown"

        def safe_int(d, *keys):
            for k in keys:
                v = d.get(k)
                if v is None:
                    continue
                try:
                    return int(v)
                except Exception:
                    try:
                        return int(float(v))
                    except Exception:
                        continue
            return 0

        balance_cents = safe_int(balances, "balance_cents", "balance")
        fee_balance_cents = safe_int(balances, "fee_balance_cents")
        incoming_balance_cents = safe_int(balances, "incoming_balance_cents")
        total_raised_cents = safe_int(balances, "total_raised", "total_raised_cents")

        return {
            "ok": True,
            "org_name": data.get("name") or "HCB",
            "org_slug": data.get("slug") or slug,
            "manager_name": manager_name,
            "balance_cents": balance_cents,
            "balance_display": cents_to_display(balance_cents),
            "fee_balance_cents": fee_balance_cents,
            "incoming_balance_cents": incoming_balance_cents,
            "total_raised_cents": total_raised_cents,
            "total_raised_display": cents_to_display(total_raised_cents),
            "website": data.get("website") or "",
            "hcb_url": f"https://hcb.hackclub.com/{data.get('slug') or slug}",
            "logo": data.get("logo") or "",
            "error": None,
        }

    except Exception as e:
        out = fallback.copy()
        out["error"] = str(e)
        return out



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7600, debug=True)

reiuweryweouybuweyiouvyrbtviuwyeiuryweiubwyneritun