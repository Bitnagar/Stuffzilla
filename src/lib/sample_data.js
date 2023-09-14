const data = {
  "data": {
    "backup_code_enabled": false,
    "banned": false,
    "birthday": "",
    "create_organization_enabled": true,
    "created_at": 1694583139909,
    "delete_self_enabled": true,
    "email_addresses": [
      {
        "email_address": "contact.ioweyn@gmail.com",
        "id": "idn_2VKSB726iwM1QXNjCXxLieejMjK",
        "linked_to": [
          {
            "id": "idn_2VKSB4aRst0xQCIXryFK0MJc9op",
            "type": "oauth_google",
          },
        ],
        "object": "email_address",
        "reserved": false,
        "verification": {
          "attempts": null,
          "expire_at": null,
          "status": "verified",
          "strategy": "from_oauth_google",
        },
      },
    ],
    "external_accounts": [
      {
        "approved_scopes":
          "email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid profile",
        "email_address": "contact.ioweyn@gmail.com",
        "family_name": "",
        "given_name": "ioweyounothingg",
        "google_id": "104502911807642723965",
        "id": "idn_2VKSB4aRst0xQCIXryFK0MJc9op",
        "label": null,
        "object": "google_account",
        "picture":
          "https://lh3.googleusercontent.com/a/ACg8ocJzn19QyKCnDZqfgIzEMD9SXy1NsoiyyMVCNmLSfl3FmA=s1000-c",
        "public_metadata": {},
        "username": null,
        "verification": {
          "attempts": null,
          "expire_at": 1694583735708,
          "status": "verified",
          "strategy": "oauth_google",
        },
      },
    ],
    "external_id": null,
    "first_name": "ioweyounothingg",
    "gender": "",
    "has_image": true,
    "id": "user_2VKSB7ub7EO2MW6cT5GIkkkdJse",
    "image_url":
      "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKem4xOVF5S0NuRFpxZmdJekVNRDlTWHkxTnNvaXl5TVZDTm1MU2ZsM0ZtQT1zMTAwMC1jIiwicyI6ImNmV3RvczNhZWlzbENwa3BvemNOUVlDWUthdlpJMndnZ3UzMDBSVU1sazgifQ",
    "last_name": null,
    "last_sign_in_at": null,
    "object": "user",
    "password_enabled": false,
    "phone_numbers": [],
    "primary_email_address_id": "idn_2VKSB726iwM1QXNjCXxLieejMjK",
    "primary_phone_number_id": null,
    "primary_web3_wallet_id": null,
    "private_metadata": {},
    "profile_image_url":
      "https://lh3.googleusercontent.com/a/ACg8ocJzn19QyKCnDZqfgIzEMD9SXy1NsoiyyMVCNmLSfl3FmA=s1000-c",
    "public_metadata": {},
    "saml_accounts": [],
    "totp_enabled": false,
    "two_factor_enabled": false,
    "unsafe_metadata": {},
    "updated_at": 1694583139948,
    "username": null,
    "web3_wallets": [],
  },
  "object": "event",
  "type": "user.created",
};

export default data;
